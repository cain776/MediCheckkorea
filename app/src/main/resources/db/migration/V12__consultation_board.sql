-- 온라인 상담 게시판.
--
-- 5장이 정한 문의는 **한 기관에게 보내는 것**이고 회신은 협회를 거치지 않는다.
-- 이 표는 그것과 다르다 — 기관을 정하지 않은 사람이 **협회 사무국에** 묻는 자리이고,
-- 물음과 답이 목록으로 남는다. 협회 사이트에 이미 있는 '1:1 상담' 게시판과 같은 자리다.
--
-- **여기 들어 있는 글은 전부 샘플이다.** 실제 상담이 아니고 실존 인물의 글도 아니다.
-- V6 이 지어낸 기관 24곳을 걷어낸 것과 같은 이유로, 이 글들도 공개 전에 지워야 한다.
-- 지우는 법은 한 줄이다:
--
--     DELETE FROM consultation_post WHERE is_sample = 1;
--
-- 그래서 is_sample 칸을 두었다. 샘플과 진짜를 눈으로 가려내야 하는 상태로 두면
-- 언젠가 섞인 채로 열리기 때문이다. 화면도 맨 위에 '샘플'이라고 먼저 밝힌다.
--
-- lang 은 medicheck_label 의 LANGUAGE 코드를 그대로 쓴다. 화면은 label('LANGUAGE', code)
-- 로 읽으므로 언어 이름이 화면마다 갈리지 않는다.

CREATE TABLE consultation_post (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    -- 화면에 보이는 글번호. id 와 따로 두는 이유는 지운 글이 생겨도 번호가 흔들리면
    -- 안 되기 때문이다 (게시판은 번호로 서로를 부른다)
    post_no       INTEGER NOT NULL,
    lang          TEXT NOT NULL,
    author_masked TEXT NOT NULL,
    title         TEXT NOT NULL,
    question      TEXT NOT NULL,
    -- 답이 없으면 NULL 이다. '대기중'을 글자로 저장하지 않는다 — 상태를 두 곳
    -- (answer 와 status)에 두면 둘이 어긋난다
    answer        TEXT,
    answered_by   TEXT,
    created_at    TEXT NOT NULL,
    answered_at   TEXT,
    is_sample     INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX idx_consultation_post_no ON consultation_post (post_no DESC);

INSERT INTO consultation_post
 (post_no, lang, author_masked, title, question, answer, answered_by, created_at, answered_at) VALUES

 (352, 'Korean', 'L*E', '친구 대신 질문해 봅니다',
  '몽골에 있는 친구가 서울에서 검진을 받으려고 하는데, 여기 올라온 병원은 다 정부에서 확인한 곳인가요? 친구가 한국어를 못해서 제가 대신 물어봅니다.',
  NULL, NULL, '2026-08-19', NULL),

 (351, 'English', 'A***********r', 'Vascular and mechanical injury after a traffic accident — where to start?',
  'I am 24 and had a motor vehicle accident two years ago. I still have vascular and mechanical damage in my left leg. I do not know which department I should write to first. Can the association point me to the right kind of hospital?',
  NULL, NULL, '2026-07-28', NULL),

 (350, 'Mongolian', 'A*******н', 'Умайн хүзүүний хорт хавдрын урьдчилсан шинжилгээ өгөх',
  'Сайн байна уу. Умайн хүзүүний хорт хавдрын урьдчилсан шинжилгээ өгөхийг хүсэж байна. Сеулд монгол хэлээр ярьдаг эмнэлэг байдаг уу? Хэдэн өдөр байх шаардлагатай вэ?',
  'Сайн байна уу. Жагсаалтаас "Хэл" шүүлтүүрээс монгол хэлийг сонговол монгол хэлээр хариу өгдөг эмнэлгүүд харагдана. Шинжилгээний хугацаа, төлбөрийг холбоо тогтоодоггүй тул сонгосон эмнэлэгтээ шууд асуулт илгээнэ үү — хариултыг эмнэлэг өөрөө өгнө.',
  '협회 사무국', '2026-07-20', '2026-07-22'),

 (349, 'Russian', 'Е*****а', 'Импланты: сколько раз нужно приехать?',
  'Здравствуйте. Мне нужны два импланта. Сколько раз придётся приезжать в Корею и сколько времени между визитами? И есть ли клиники, где говорят по-русски?',
  'Здравствуйте. Количество визитов зависит от плана лечения, и ассоциация его не определяет — этот вопрос нужно задать самой клинике через форму запроса. В списке можно отфильтровать клиники по языку «русский», и рядом с каждой указано, какую запись мы проверили и когда.',
  '협회 사무국', '2026-07-14', '2026-07-15'),

 (348, 'Chinese', '王**', '双眼皮手术后多久可以回国？',
  '您好。我打算在首尔做双眼皮手术，想知道术后大概几天可以坐飞机回国。另外，回国以后如果有问题，可以联系医院吗？',
  '您好。恢复时间和回国时间由医生根据个人情况判断，协会不做医疗判断，请通过咨询表单直接询问医院。关于回国后的联系方式，"患者旅程"页面写明了应该在出院前向医院确认哪些内容。',
  '협회 사무국', '2026-07-02', '2026-07-03'),

 (347, 'Japanese', 'S***子', '健康診断の予約は何日前までに必要ですか',
  'ソウルで人間ドックを受けたいのですが、何日前までに予約が必要でしょうか。日本語で対応してもらえる施設はありますか。',
  '予約に必要な日数は施設ごとに異なり、協会が定めているものではありません。一覧の「言語」で日本語を選ぶと、日本語で対応すると届け出ている施設が表示されます。予約可能日は問い合わせフォームから施設に直接お尋ねください。',
  '협회 사무국', '2026-06-28', '2026-06-29'),

 (346, 'English', 'M********a', 'What exactly does the blue badge mean?',
  'Some hospitals on your list have a blue badge that says "Listed by Seoul Medical Tourism". Does that mean the association checked the doctors and the quality of care?',
  'No. The badge means we opened a public record and found this hospital on it, and we show the day we read it. We did not check the doctors, the prices, or the outcome — the "About certification" page lists what we checked and what we did not, side by side.',
  '협회 사무국', '2026-06-21', '2026-06-21'),

 (345, 'Mongolian', 'B*****р', 'Нурууны мэс засал хийлгэх боломжтой эмнэлэг',
  'Нурууны мэс засал хийлгэхээр төлөвлөж байна. Гадаад өвчтөн хүлээн авдаг, нурууны мэс засалд төрөлжсөн эмнэлгийн жагсаалт байгаа юу?',
  NULL, NULL, '2026-06-15', NULL),

 (344, 'Russian', 'Д******й', 'Нужна ли виза для лечения?',
  'Здравствуйте. Нужна ли отдельная медицинская виза, если лечение занимает около трёх недель?',
  'Вопросы визы решает консульство, а не ассоциация, поэтому мы не можем дать здесь официальный ответ. Многие клиники из списка готовят документы для медицинской визы — об этом стоит спросить клинику напрямую через форму запроса.',
  '협회 사무국', '2026-06-08', '2026-06-09'),

 (343, 'Chinese', '李***', '医院会提供中文翻译吗？',
  '我不会韩语也不会英语。列表里的医院会安排中文翻译吗？还是需要我自己带翻译？',
  '在一览页面的"语言"筛选中选择"中文"，会显示已申报可用中文接待的机构。是否配备专职翻译由各机构自行决定，协会没有核实这一点，因此请在咨询时直接向机构确认。',
  '협회 사무국', '2026-05-30', '2026-05-31'),

 (342, 'Korean', '박**', '목록에 없는 병원은 나쁜 병원인가요?',
  '지인이 추천한 병원이 여기 목록에 없습니다. 문제가 있는 병원이라는 뜻인가요?',
  '아닙니다. 이 목록은 협회가 공개 기록에서 확인한 곳만 싣습니다. 기록에 없거나 아직 확인하지 못한 곳은 올라오지 않을 뿐이고, 그것이 그 병원에 대한 평가는 아닙니다. 내려간 기관은 날짜와 사유를 붙여 따로 공개하고 있습니다.',
  '협회 사무국', '2026-05-22', '2026-05-22'),

 (341, 'English', 'J*****n', 'Can I get a price quote through this site?',
  'Is it possible to receive a cost estimate for a knee replacement before I fly? I would like to compare two or three hospitals.',
  NULL, NULL, '2026-05-14', NULL);
