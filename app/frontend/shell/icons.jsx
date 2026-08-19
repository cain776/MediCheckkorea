/**
 * 진료과목 아이콘.
 *
 * <p>서울시 목록의 분류 아이콘과 같은 자리·같은 결(원형 타일 + 검은 선)을 노린다.
 * 다만 <b>그쪽 이미지 파일을 가져오지 않는다.</b> 기관명·주소 같은 사실과 달리 아이콘은
 * 창작물이고, 그 사이트 어디에도 공공누리나 저작권 표시가 없다 — 허락을 확인하지 못한
 * 남의 그림을 배포본에 넣지 않는다.
 *
 * <p>직접 그리면 덤도 있다. 스프라이트가 아니라 SVG 라 어느 크기에서도 또렷하고,
 * 색이 <code>currentColor</code> 를 따르며, 우리 진료과목 11종에 정확히 맞는다.
 *
 * <p>선은 굵기 1.6, 끝은 둥글게. 24×24 안에서 그린다.
 */

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

/** 상급종합병원 — 건물에 별 하나. 급을 나타내는 표시다. */
const TertiaryHospital = (
  <svg {...base}>
    <path d="M4 21h16M6 21V8l6-4 6 4v13" />
    <path d="M12 8.4l.7 1.5 1.6.2-1.2 1.1.3 1.6-1.4-.8-1.4.8.3-1.6-1.2-1.1 1.6-.2z" />
    <path d="M9.5 21v-3.5h5V21" />
  </svg>
);

/** 종합병원 — 건물에 십자. */
const GeneralHospital = (
  <svg {...base}>
    <path d="M4 21h16M6 21V5h12v16" />
    <path d="M12 8v4M10 10h4" />
    <path d="M9.5 21v-3.5h5V21" />
  </svg>
);

/** 병원 — 진료 표시. 상급·종합과 나란히 서므로 건물로 셋을 그리면 구분이 안 된다. */
const Hospital = (
  <svg {...base}>
    <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="4.4" />
    <path d="M12 8.4v7.2M8.4 12h7.2" />
  </svg>
);

/** 성형외과 — 얼굴에 반짝임. 옆얼굴 윤곽은 28px 에서 덩어리로 뭉쳐 못 쓴다. */
const PlasticSurgery = (
  <svg {...base}>
    <circle cx="10.8" cy="12.6" r="7.2" />
    <path d="M8.3 11.2h.01M13.3 11.2h.01" />
    <path d="M8.4 15.3c1.4 1.1 3.4 1.1 4.8 0" />
    <path d="M18.6 3.2l.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7z" />
  </svg>
);

/** 피부과 — 살결과 돋보기. 웃는 얼굴로 그리면 '기분'으로 읽힌다. */
const Dermatology = (
  <svg {...base}>
    <rect x="3.2" y="3.2" width="12.6" height="12.6" rx="3.4" />
    <path d="M6.6 7h.01M10 6.4h.01M7.4 10.6h.01M11.4 10h.01" />
    <circle cx="15.4" cy="15.4" r="4.1" />
    <path d="M18.4 18.4l2.3 2.3" />
  </svg>
);

/** 안과 — 눈. */
const Ophthalmology = (
  <svg {...base}>
    <path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="2.6" />
  </svg>
);

/** 치과 — 이. */
const Dentistry = (
  <svg {...base}>
    <path d="M7.4 3.6C5.3 3.6 4 5.3 4 7.6c0 2 .5 3.3.9 5 .5 2.2.6 6.4 2.4 6.4 1.6 0 1.6-3.4 2.4-5.3.4-1 1-1.5 2.3-1.5s1.9.5 2.3 1.5c.8 1.9.8 5.3 2.4 5.3 1.8 0 1.9-4.2 2.4-6.4.4-1.7.9-3 .9-5 0-2.3-1.3-4-3.4-4-1.6 0-2.5.9-4.6.9s-3-.9-4.6-.9z" />
  </svg>
);

/** 척추관절 — 뼈. 관절을 곡선으로 그리면 28px 에서 무엇인지 모른다. */
const Orthopedics = (
  <svg {...base}>
    <path d="M7.4 4.4a2.2 2.2 0 0 1 3.5 2.5l6.2 6.2a2.2 2.2 0 1 1-1.5 3.9 2.2 2.2 0 1 1-3.9-1.5L5.5 9.3a2.2 2.2 0 1 1-1.5-3.9 2.2 2.2 0 1 1 3.4-1z" />
  </svg>
);

/** 한의과 — 잎과 잎맥. 침 하나만 그리면 그냥 사선으로 보인다. */
const KoreanMedicine = (
  <svg {...base}>
    <path d="M20.2 3.8C10.6 3.8 4 10.4 4 20c9.6 0 16.2-6.6 16.2-16.2z" />
    <path d="M4.6 19.4L14.4 9.6" />
  </svg>
);

/** 건강검진센터 — 검진표와 맥박. */
const HealthScreening = (
  <svg {...base}>
    <rect x="4.5" y="3.5" width="15" height="17" rx="2.2" />
    <path d="M9 3.5V2.8h6v.7" />
    <path d="M7.5 13h2l1.2-2.6L13 15.6l1.2-2.6h2.3" />
  </svg>
);

/** 기타진료과목 — 더 있다는 표시. */
const Other = (
  <svg {...base}>
    <circle cx="12" cy="12" r="8.2" />
    <path d="M8.4 12h.01M12 12h.01M15.6 12h.01" />
  </svg>
);

/** 전체 보기 — 글자로 둔다. 그림으로 그리면 무엇의 전체인지 안 읽힌다. */
export const AllMark = <span className="tile__all">ALL</span>;

/** 자료가 쓰는 말이 열쇠다. label 표의 code 와 같은 값이어야 한다. */
export const SPECIALTY_ICONS = {
  "Tertiary hospital": TertiaryHospital,
  "General hospital": GeneralHospital,
  Hospital,
  "Plastic surgery": PlasticSurgery,
  Dermatology,
  Ophthalmology,
  Dentistry,
  Orthopedics,
  "Korean medicine": KoreanMedicine,
  "Health screening": HealthScreening,
  Other,
};
