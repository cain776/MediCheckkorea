package kr.or.kmtpa.medicheck.hospital;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 * 등재된 기관을 읽는다 — "Find a hospital" 이 쓰는 곳.
 *
 * <p><b>등재 조건은 한 곳에서만 판단한다.</b> {@code listed = 1} 이고 등록번호가 있는 것.
 * 회비를 냈다고 올라가지 않는다(3장). 이 조건이 코드 여기저기에 흩어지면 언젠가
 * 한 군데가 빠지고, 그 순간 등록번호 없는 기관이 배지를 달고 목록에 선다.
 */
@Repository
public class HospitalRepository {

    /**
     * 4장 — 등재 조건. 다른 곳에서 다시 쓰지 말고 이걸 가져다 쓴다.
     *
     * <p><b>근거 없이는 안 올라간다.</b> 다만 인정하는 근거가 둘이고, 둘 다 밖에서
     * 확인할 수 있어야 한다 — MOHW 는 등록번호로, SEOUL 은 원문 주소로.
     * 근거가 무엇이든 <b>배지가 그것을 이름으로 말한다</b>(28장).
     */
    private static final String LISTED = """
            l.listed = 1
              AND c.org_type <> 'AGENCY'
              AND (
                    (l.source = 'MOHW' AND c.promotion_reg_no IS NOT NULL AND c.promotion_reg_no <> '')
                 OR (l.source = 'SEOUL' AND l.source_url IS NOT NULL AND l.source_url <> '')
              )
            """;

    /**
     * 지역은 칸에서 읽는다.
     *
     * <p>처음에는 6장대로 주소를 잘라 썼다 — 'Gangnam-gu, Seoul' 이니 쉼표 뒤가 지역이라고.
     * 실제 자료가 들어오자 바로 깨졌다. '서울특별시 강남구 도산대로 119' 에는 쉼표가
     * 없어서 주소 전체가 지역이 되고, 지역 상자에 100개의 서로 다른 '지역'이 들어찼다.
     *
     * <p>이제 넣는 쪽이 지역을 정하고(V3 · V4) 읽는 쪽은 자르지 않는다.
     * 주소 형식이 또 바뀌어도 여기는 안 깨진다.
     */
    private static final String REGION = "l.region";

    private static final String SELECT = """
            SELECT c.member_id, c.org_name, c.org_name_en, c.promotion_reg_no,
                   c.specialties, c.address, c.website,
                   %s AS region,
                   l.verified_at, l.verified_by, l.reg_expires_at,
                   l.source, l.source_url,
                   l.languages, l.intro_ko, l.intro_en, l.photo, l.updated_at,
                   l.transport, l.features, l.hours, l.phone, l.email, l.address_detail,
                   l.doctors, l.beds, l.detail_read_at
            FROM member_corp c
            JOIN medicheck_listing l ON l.member_id = c.member_id
            WHERE %s
            """.formatted(REGION, LISTED);

    private final JdbcTemplate jdbc;

    public HospitalRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public int listedCount() {
        Long count = jdbc.queryForObject(
                "SELECT COUNT(*) FROM member_corp c JOIN medicheck_listing l ON l.member_id = c.member_id WHERE " + LISTED,
                Long.class);
        return count == null ? 0 : count.intValue();
    }

    /** 목록에서 가장 최근에 확인한 날. 첫 화면의 "재확인" 문구가 이걸 쓴다(30장). */
    public Optional<String> lastVerifiedAt() {
        return Optional.ofNullable(jdbc.queryForObject(
                "SELECT MAX(l.verified_at) FROM member_corp c JOIN medicheck_listing l ON l.member_id = c.member_id WHERE " + LISTED,
                String.class));
    }

    public List<Map<String, Object>> search(String query, String specialty, String region, String language, String sort) {
        StringBuilder sql = new StringBuilder(SELECT);
        List<Object> args = new ArrayList<>();

        if (hasText(query)) {
            sql.append(" AND (c.org_name_en LIKE ? OR c.org_name LIKE ? OR c.specialties LIKE ?)");
            String like = "%" + query.trim() + "%";
            args.add(like);
            args.add(like);
            args.add(like);
        }
        if (hasText(specialty)) {
            sql.append(" AND c.specialties LIKE ?");
            args.add("%" + specialty.trim() + "%");
        }
        if (hasText(region)) {
            sql.append(" AND ").append(REGION).append(" = ?");
            args.add(region.trim());
        }
        if (hasText(language)) {
            sql.append(" AND l.languages LIKE ?");
            args.add("%" + language.trim() + "%");
        }

        // 정렬은 둘뿐이고 둘 다 사실이다 — 이름과 날짜. 사람이 손으로 순서를 바꾸는
        // 길은 만들지 않는다. 한 번 만들면 반드시 요청이 들어오고, 거절할 근거가 없어진다(4장).
        // 영문명이 없는 기관이 있다. org_name_en 으로만 줄 세우면 그 100건이 NULL 끼리
        // 들어온 순서로 늘어서면서, 화면은 그걸 '이름순'이라고 적게 된다.
        // 4장은 정렬 기준을 공개하라고 했지 공개한 대로 정렬하라는 말까지는 안 했지만,
        // 적어 둔 기준과 실제가 다르면 공개하지 않은 것과 같다.
        sql.append("updated".equals(sort)
                ? " ORDER BY l.updated_at DESC, COALESCE(c.org_name_en, c.org_name) ASC"
                : " ORDER BY COALESCE(c.org_name_en, c.org_name) ASC");

        return jdbc.query(sql.toString(), (rs, rowNum) -> toMap(rs), args.toArray());
    }

    public Optional<Map<String, Object>> findById(String memberId) {
        List<Map<String, Object>> rows =
                jdbc.query(SELECT + " AND c.member_id = ?", (rs, rowNum) -> toMap(rs), memberId);
        return rows.isEmpty() ? Optional.empty() : Optional.of(rows.get(0));
    }

    /** 거르기 상자를 채울 값들. 자료에 실제로 있는 것만 나온다 — 없는 조건을 보여 주면 0건이 나온다. */
    public Map<String, List<String>> facets() {
        Map<String, List<String>> facets = new LinkedHashMap<>();
        facets.put("specialties", splitDistinct("c.specialties"));
        facets.put("languages", splitDistinct("l.languages"));
        facets.put(
                "regions",
                jdbc.queryForList(
                        "SELECT DISTINCT " + REGION + " AS r FROM member_corp c "
                                + "JOIN medicheck_listing l ON l.member_id = c.member_id WHERE " + LISTED
                                + " ORDER BY r",
                        String.class));
        return facets;
    }

    /**
     * 진료과목을 그 과목을 하는 기관 수가 많은 순으로.
     *
     * <p>첫 화면 타일이 쓴다. 가나다순으로 앞 여덟을 자르면 실제로 거의 없는 과목이
     * 앞에 서고 흔한 과목이 잘린다. <b>세는 대상이 과목이지 기관이 아니므로</b>
     * 4장의 "순서를 팔지 않는다"와 부딪치지 않는다 — 어느 기관도 이 순서로 위에 서지 않는다.
     */
    public List<String> specialtiesByFrequency(int limit) {
        List<String> joined = jdbc.queryForList(
                "SELECT c.specialties FROM member_corp c JOIN medicheck_listing l ON l.member_id = c.member_id "
                        + "WHERE " + LISTED + " AND c.specialties IS NOT NULL",
                String.class);

        Map<String, Integer> counts = new LinkedHashMap<>();
        for (String value : joined) {
            for (String name : value.split(",")) {
                String trimmed = name.trim();
                if (!trimmed.isEmpty() && !"—".equals(trimmed)) {
                    counts.merge(trimmed, 1, Integer::sum);
                }
            }
        }
        return counts.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue()
                        .reversed()
                        .thenComparing(Map.Entry.comparingByKey()))
                .limit(limit)
                .map(Map.Entry::getKey)
                .toList();
    }

    /** 쉼표로 붙어 있는 값을 낱개로 편다. 6장이 진료과목을 한 칸에 넣기로 했으므로 여기서 나눈다. */
    private List<String> splitDistinct(String column) {
        List<String> joined = jdbc.queryForList(
                "SELECT " + column + " FROM member_corp c JOIN medicheck_listing l ON l.member_id = c.member_id "
                        + "WHERE " + LISTED + " AND " + column + " IS NOT NULL",
                String.class);
        return joined.stream()
                .flatMap(value -> Arrays.stream(value.split(",")))
                .map(String::trim)
                .filter(value -> !value.isEmpty() && !"—".equals(value))
                .distinct()
                .sorted()
                .toList();
    }

    private static Map<String, Object> toMap(java.sql.ResultSet rs) throws java.sql.SQLException {
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("id", rs.getString("member_id"));
        row.put("nameEn", rs.getString("org_name_en"));
        row.put("nameKo", rs.getString("org_name"));
        row.put("registrationNo", rs.getString("promotion_reg_no"));
        row.put("specialties", split(rs.getString("specialties")));
        row.put("region", rs.getString("region"));
        row.put("address", rs.getString("address"));
        row.put("website", rs.getString("website"));
        row.put("verifiedAt", rs.getString("verified_at"));
        row.put("verifiedBy", rs.getString("verified_by"));
        // 배지가 무엇을 근거로 붙었는지. 화면은 이 값으로 문구를 고른다 — 문구를
        // 화면에 하드코딩하면 근거가 늘 때마다 두 곳이 어긋난다.
        row.put("source", rs.getString("source"));
        row.put("sourceUrl", rs.getString("source_url"));
        row.put("registrationExpiresAt", rs.getString("reg_expires_at"));
        row.put("languages", split(rs.getString("languages")));
        row.put("introEn", rs.getString("intro_en"));
        row.put("introKo", rs.getString("intro_ko"));
        row.put("photo", rs.getString("photo"));
        row.put("updatedAt", rs.getString("updated_at"));
        // 서울시 상세 페이지에서 옮겨 적은 값들 (V10). 협회가 확인한 것이 아니므로
        // 화면은 이 묶음을 따로 세우고 출처와 읽은 날을 함께 적는다 — 배지 옆 두 줄과
        // 섞으면 협회가 진료 시간과 병상 수까지 확인해 준 것처럼 읽힌다 (28장).
        row.put("transport", rs.getString("transport"));
        row.put("features", split(rs.getString("features")));
        row.put("hours", rs.getString("hours"));
        row.put("phone", rs.getString("phone"));
        row.put("email", rs.getString("email"));
        row.put("addressDetail", rs.getString("address_detail"));
        // 0 은 '없다'가 아니라 '적혀 있지 않다'와 다르다. null 을 0 으로 바꾸지 않는다
        row.put("doctors", nullableInt(rs, "doctors"));
        row.put("beds", nullableInt(rs, "beds"));
        row.put("detailReadAt", rs.getString("detail_read_at"));
        return row;
    }

    /** 값이 없으면 null 로 둔다. {@code getInt} 는 NULL 을 0 으로 돌려주므로 쓰지 않는다. */
    private static Integer nullableInt(java.sql.ResultSet rs, String column) throws java.sql.SQLException {
        int value = rs.getInt(column);
        return rs.wasNull() ? null : value;
    }

    private static List<String> split(String value) {
        if (value == null || value.isBlank()) {
            return List.of();
        }
        return Arrays.stream(value.split(",")).map(String::trim).filter(v -> !v.isEmpty()).toList();
    }

    private static boolean hasText(String value) {
        return value != null && !value.isBlank();
    }
}
