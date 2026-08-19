-- 특화진료를 태그 그대로 다시 적는다.
--
-- V10 은 상세 페이지의 특화진료를 **한 줄로 읽어 공백에서 잘랐다.** 서울시 화면은
-- 낱말 하나를 <span> 하나로 그리는데, 그 태그가 '화상성형 및 재건'처럼 띄어쓰기를
-- 품고 있으면 셋으로 쪼개진다 — 화면에 '및' 이 알약 하나로 서 있었다.
--
-- 마이그레이션은 append-only 다. 이미 돌아간 V10 을 고치지 않고 여기서 덮어쓴다
-- (CLAUDE.md 규칙 2). 받은 날: 2026-08-19 · app/scrape-detail.mjs 가 이번에는
-- dd 의 <span> 을 그대로 받는다.

UPDATE medicheck_listing SET features = '조혈모세포이식, 다빈치 로봇수술, 대장암 및 직장암, 대동맥판막중재술(TAVI), 유방재건 수술' WHERE member_id = 'VS1';
UPDATE medicheck_listing SET features = '척추 질환, 관절 질환, 다이어트, 부인과질환, 그 외 내과질환' WHERE member_id = 'VS106';
UPDATE medicheck_listing SET features = '종합건강검진, 갑상선암, 유방암, 대장암, 전립선암, 부인과암, 로봇수술' WHERE member_id = 'VS11';
UPDATE medicheck_listing SET features = '탈모증 진료' WHERE member_id = 'VS1118';
UPDATE medicheck_listing SET features = '안티엔이징시술, 콜라겐터치, 매직코, 키스필' WHERE member_id = 'VS113';
UPDATE medicheck_listing SET features = '각종 암 진단 및 치료, 방사선치료 연구, 건강검진' WHERE member_id = 'VS118';
UPDATE medicheck_listing SET features = '종합검진, 심혈관중재시술, 암수술(로봇), ALS세포치료' WHERE member_id = 'VS12';
UPDATE medicheck_listing SET features = '신경외과, 정형외과, 갑상선, 비뇨기과, 재활의학과' WHERE member_id = 'VS121';
UPDATE medicheck_listing SET features = '백내장, 노안 수술, 클리어 스마일라식, 노안라식, 라식, 라섹, 눈 종합검진, 안구건조증' WHERE member_id = 'VS128';
UPDATE medicheck_listing SET features = '림프종센터, 다빈치로봇수술, 암센터' WHERE member_id = 'VS13';
UPDATE medicheck_listing SET features = '암치료 다학제 협진시스템, 고난도 중증질환수술, 로봇수술센터, 질환별 한방진료, 건강검진' WHERE member_id = 'VS14';
UPDATE medicheck_listing SET features = '항문외과, 대장암센터, 건감검진, 탈장치료, 위대장내시경' WHERE member_id = 'VS15';
UPDATE medicheck_listing SET features = '불임, 난임(여성, 남성), 시험관아기시술, 분만, 자궁복강경수술' WHERE member_id = 'VS16';
UPDATE medicheck_listing SET features = '관절내시경수술, 인공관절로봇수술, 척추내시경수술, 척추변형수술, 건강검진센터' WHERE member_id = 'VS17';
UPDATE medicheck_listing SET features = '척추, 관절, - 신경외과 :추간판 탈출증(디스크), 척추협착증, 척추전방전위증, 척추분리증, 황색인대골화증 - 정형외과: 인공관절치환술, 오십견, 회전근개파열' WHERE member_id = 'VS18';
UPDATE medicheck_listing SET features = '종합건강검진, 유방암, 두경부암, 뇌종양, 부인암, 소화기계암 등 암치료, 인공관절치환술, 고도비만수술 등' WHERE member_id = 'VS19';
UPDATE medicheck_listing SET features = '유방암, 갑상선암, 부인과질환, 심장질환, 건강검진(프리미엄, VIP)' WHERE member_id = 'VS2';
UPDATE medicheck_listing SET features = '관절, 척추, 줄기세포 치료, 근감소증 체성분 분석, AI를 이용한 MAES (급성 중증이벤트) 시행 예정' WHERE member_id = 'VS20';
UPDATE medicheck_listing SET features = '건강검진, ESD, EMR, 고도비만 수술, 갑상선암, 유방암, 관절수술' WHERE member_id = 'VS21';
UPDATE medicheck_listing SET features = '피부 레이져치료, 체중감량, 체형교정, 피로, 질환치료' WHERE member_id = 'VS2111';
UPDATE medicheck_listing SET features = '유방, 갑상선, 건강검진, 내과통합, 정형외과' WHERE member_id = 'VS2221';
UPDATE medicheck_listing SET features = '퇴행성 무릎 관절염, 스포츠 손상' WHERE member_id = 'VS2222';
UPDATE medicheck_listing SET features = '신경외과, 정형외과, 내과, 영상의학과, 건강검진 등' WHERE member_id = 'VS2223';
UPDATE medicheck_listing SET features = '미니쉬 시술, 미니쉬 원데이 시술, 예방의학과 정밀 구강검진, 치아미백' WHERE member_id = 'VS2224';
UPDATE medicheck_listing SET features = '자궁, 난소질환 치료, 요실금 치료, 출산 및 산후 관리, 유방, 갑상선 외과, 건강검진' WHERE member_id = 'VS2225';
UPDATE medicheck_listing SET features = '7세대 실크 스마일 라식, 올레이저 라섹, 백내장 다초점 수술, 백내장 믹스앤매치 수술, ICL 렌즈삽입, 시력교정, 망막질환 및 안구건조, 안구종합검진' WHERE member_id = 'VS2226';
UPDATE medicheck_listing SET features = '관절, 척추, 신경과, 건강검진' WHERE member_id = 'VS2227';
UPDATE medicheck_listing SET features = '심한 디스크 및 협착증, 디스크, 협착증, 비수술통증치료 -> 고난도 척추수술, 척추내시경, 디스크, 협착증, 관절경, 로봇 인공관절수술, 절골술' WHERE member_id = 'VS2228';
UPDATE medicheck_listing SET features = '항노화센터(리프팅, 안티에이징), 여드름, 여드름흉터, 모공, 색소, 홍조, 겨드랑이 땀냄새제거 미라드라이, 필러, 보톡스, 스킨부스터' WHERE member_id = 'VS2229';
UPDATE medicheck_listing SET features = '라식, 라섹, 스마일라식, 시력교정, 렌즈삽입술, 드림렌즈, 노안백내장, 백내장, 녹내장, 환반변성' WHERE member_id = 'VS2230';
UPDATE medicheck_listing SET features = '백내장, 스마일, 라식, 라섹' WHERE member_id = 'VS2231';
UPDATE medicheck_listing SET features = '스마일라식, 올레이저라섹, 렌즈삽입술(ICL), 노안백내장수술, 안과종합검진 (안구건조증, 망막, 녹내장)' WHERE member_id = 'VS2232';
UPDATE medicheck_listing SET features = '클리어스마일라식, 올레이저라섹/라식, 렌즈삽입술, 노안/백내장수술, 드림렌즈' WHERE member_id = 'VS2233';
UPDATE medicheck_listing SET features = 'ZEIS 스마일수술, ZEIS 스마일프로, LBV노안교정수술, 백내장, 렌즈삽입술(ICL)' WHERE member_id = 'VS2234';
UPDATE medicheck_listing SET features = '노안·백내장, 녹내장, 시력교정, 안구건조증' WHERE member_id = 'VS2235';
UPDATE medicheck_listing SET features = '녹내장, 백내장, 시력교정술, 망막관련질환, 정밀검사' WHERE member_id = 'VS2236';
UPDATE medicheck_listing SET features = '백내장, 시력교정술, 렌즈삽입술, 눈 건강검진' WHERE member_id = 'VS2237';
UPDATE medicheck_listing SET features = '다이어트' WHERE member_id = 'VS2262';
UPDATE medicheck_listing SET features = '질성형, 외음부성형, 피부 쁘띠시술' WHERE member_id = 'VS2264';
UPDATE medicheck_listing SET features = '모발이식, 탈모치료' WHERE member_id = 'VS2265';
UPDATE medicheck_listing SET features = '성형외과, 피부과' WHERE member_id = 'VS2266';
UPDATE medicheck_listing SET features = '레이저, 흉터치료, 안티에이징, 리프팅, 윤곽교정' WHERE member_id = 'VS2267';
UPDATE medicheck_listing SET features = '건강검진, 요실금 수술, 자궁근종 (HIFU 시술), 질성형 수술, 소음순 수술' WHERE member_id = 'VS2268';
UPDATE medicheck_listing SET features = '라미네이트, 임플란트, 치아교정, 치아미백, 충치치료' WHERE member_id = 'VS2269';
UPDATE medicheck_listing SET features = '양악수술, 안면윤곽수술, (수면)사랑니발치, 보형물제거 및 소수술, 함치성낭종 제거' WHERE member_id = 'VS2271';
UPDATE medicheck_listing SET features = '여드름흉터, 피부, 다이어트, 여성질환, 내과, 통증치료' WHERE member_id = 'VS2272';
UPDATE medicheck_listing SET features = '- 안티에이징: 안면거상술, 목거상술, 이마거상술, 관자리프팅, PRP미세지방이식, 실리프팅, 줄기세포 시술, 얼굴 지방흡입 - 눈 성형: 쌍커풀 수술, 트임 수술(앞트임, 뒤트임, 밑트임, 윗트임), 상/하안검 수술, 눈 재수술 - 코 성형: 1차 코성형, 코 재수술, 핏미보형물 사용 코성형, 비염 코성형 - 안면 윤곽 수술: 핀없는 안면윤곽술, 광대 축소술, 사각턱 축소술, 턱끝 수술, 무턱 수술, 앞광대 성형, 귀족 성형, 볼륨 이마성형, 안면 여성화 성형 (Facial Feminization) - 가슴 성형: 가슴 축소/거상/확대 수술, 여유증 수술(여성형 유방증) - 바디 성형: 지방흡입, 복부거상술, 팔 거상술, 허벅지 거상술, 둔부 거상술, 힙업 성형, 자가지방 이식, Mommy Makeover, 지방분해주사 - 웰니스: 줄기세포 치료, 고압산소치료' WHERE member_id = 'VS2273';
UPDATE medicheck_listing SET features = '근골격계 통증, 다이어트, 건강증진 보약, 스포츠 부상, 스트레스 관리' WHERE member_id = 'VS2275';
UPDATE medicheck_listing SET features = '리프팅, 흉터, 색소' WHERE member_id = 'VS2276';
UPDATE medicheck_listing SET features = '보톡스, 필러, 리프팅, 피부레이저, 줄기세포' WHERE member_id = 'VS2277';
UPDATE medicheck_listing SET features = '스마일.스마일 프로, 라식.라섹, 노안, 백내장, 렌즈삽입술' WHERE member_id = 'VS2278';
UPDATE medicheck_listing SET features = '스케일링, 충치치료, 현미경 신경치료, 임플란트, 치아미백, 투명교정, 사랑니발치' WHERE member_id = 'VS2279';
UPDATE medicheck_listing SET features = '참단재생의료시실기관, 갱년기, 항노화, 줄기세포, 유방, 갑상선, 골밀도, 상복부, 하복부 초음파, 부인과종양, 여성시술 질필러, 질레이저, 질성형 레이저 소음순 수술 대음순리프팅' WHERE member_id = 'VS2281';
UPDATE medicheck_listing SET features = '모든 부위 성형 수술, 실리프팅, 스킨부스터, 필러등 쁘띠시술, (눈, 눈재수술, 코, 코재수술, 지방이식, 흡입, 이마거상, 엑소좀, 리쥬란, 필러, 보톡스, 실리프팅' WHERE member_id = 'VS2282';
UPDATE medicheck_listing SET features = '안티에이징, 안면거상, 안면윤곽, 구순구개열, 줄기세포' WHERE member_id = 'VS2283';
UPDATE medicheck_listing SET features = '임플란트, 보철, 심미, 충치, 신경치료, 턱관절 치료, 수면진료' WHERE member_id = 'VS2284';
UPDATE medicheck_listing SET features = '인체해독, 갱년기질환, 수면장애, 안면비대칭교정, 바디&페이스리프팅, 비만/다이어트, 컬러테라피, 개인맞춤웰니스' WHERE member_id = 'VS2285';
UPDATE medicheck_listing SET features = '눈 수술 : 쌍꺼풀 수술, 트임 수술, 상안검, 하안검, 눈재수술, 코 수술 : 코수술, 코재수술, 안티에이징 : 이마거상, 안면거상, 목거상, 가슴 수술 : 가슴확대, 가슴리프팅, 가슴축소' WHERE member_id = 'VS2286';
UPDATE medicheck_listing SET features = '눈성형, 코성형, 지방이식, 지방흡입, 안티에이징, 리프팅수술, 보톡스, 필러, 스킨부스터' WHERE member_id = 'VS2287';
UPDATE medicheck_listing SET features = '대사증후군 클리닉(당뇨, 고혈압, 고지혈증, 지방간), 자가면역질환 클리닉(류마티스 관절염, 쇼그렌증후군, 루푸스, 염증성 장질환, 갑상선기능저하증/항진증), 체질/유전체타입판정' WHERE member_id = 'VS2288';
UPDATE medicheck_listing SET features = '미세현미경신경치료, 심미보철수복, 임플란트, 치아미백, 검진, 스케일링' WHERE member_id = 'VS2289';
UPDATE medicheck_listing SET features = '건강검진, 특수건강진단' WHERE member_id = 'VS2290';
UPDATE medicheck_listing SET features = '양악수술, 악교정수술, 윤곽수술, 사랑니 수술, 치과교정' WHERE member_id = 'VS2291';
UPDATE medicheck_listing SET features = '리프팅, 스킨부스터, 미백, 흉터 레이저, 필러, 보톡스, 비만관리' WHERE member_id = 'VS2292';
UPDATE medicheck_listing SET features = '고압산소치료 - 수술후붓기, 안티에이징 - 무통스킨부스터, 실리프팅, 레이저리프팅 - 울쎄라, 필러, 보톡스' WHERE member_id = 'VS2293';
UPDATE medicheck_listing SET features = '피부, 비만' WHERE member_id = 'VS2294';
UPDATE medicheck_listing SET features = '눈재수술, 코재수술, 이마거상, 안면거상, 지방이식' WHERE member_id = 'VS2296';
UPDATE medicheck_listing SET features = '백내장수술, 시력교정술(퍼스널아이즈, 컨투라라섹, 클리어스마일, 라식, 라섹), 망막수술, 시력교정 재수술, 백내장 재수술' WHERE member_id = 'VS2297';
UPDATE medicheck_listing SET features = '탄력리프팅 (비수술항노화시술, 윤곽개선술), 미백, 색소치료, 여드름, 흉터치료, MAST 알레르기 검사, 피부면역검사, 활성산소, 항산화검사, NK세포검사 등 항노화 검사 및 주사시술, 리프팅 스킨부스터 미백 흉터 레이저 필러 보톡스 비만관리' WHERE member_id = 'VS2298';
UPDATE medicheck_listing SET features = '안면거상, 얼굴성형, 바디성형, 가슴성형' WHERE member_id = 'VS2299';
UPDATE medicheck_listing SET features = '리프팅 (실, 레이저), 지방성형 (다이어트), 쁘띠(필러, 보톡스 등), 흉터제거, 레이저제모' WHERE member_id = 'VS2300';
UPDATE medicheck_listing SET features = '종합건강검진, 기업건강검진, 특수건강검진, 위내시경, 대장내시경' WHERE member_id = 'VS2301';
UPDATE medicheck_listing SET features = '안면거상술, 에피티콘 실리프팅, 바디필러, 힙업리프팅, 중년눈성형' WHERE member_id = 'VS2302';
UPDATE medicheck_listing SET features = '질성형, 소음순수술, 대음순수술, 질필러, 비비브' WHERE member_id = 'VS2303';
UPDATE medicheck_listing SET features = '화상 다학제 진료, 고압산소치료센터, 로봇재활센터, 화상 PTSD, 화상성형 및 재건, 피부재생치료' WHERE member_id = 'VS24';
UPDATE medicheck_listing SET features = '라식, 라섹 시력교정수술, 백내장 수술, 망막질환 주사치료, 안구건조증 클리닉' WHERE member_id = 'VS25';
UPDATE medicheck_listing SET features = '건강검진, 각종 암 치료, 백혈병 및 각종 림프종' WHERE member_id = 'VS3';
UPDATE medicheck_listing SET features = '임플란트, 크라운, 심미보철, 수면마취, 치아미백' WHERE member_id = 'VS38';
UPDATE medicheck_listing SET features = '눈, 코, 안티에이징, 리프팅' WHERE member_id = 'VS39';
UPDATE medicheck_listing SET features = '건강검진, 소화기내시경, 정형외과 수술, 산부인과 수술, 로봇수술' WHERE member_id = 'VS4';
UPDATE medicheck_listing SET features = '척추수술, 재활의학과, 통증관리, 경피적 내시경 감압술 (경추, 흉추, 요추), 최소침습척추유합술, 척추측만증수술' WHERE member_id = 'VS40';
UPDATE medicheck_listing SET features = '건강검진, 종합검진, 외국인검진, 의료관광' WHERE member_id = 'VS41';
UPDATE medicheck_listing SET features = '간이식수술, 경피적대동맥판막치환술(TAVI), 경구로봇갑상선수술(TORT), 비만대사수술, 인공고관절치환술, 각종 암질환(유방암, 대장암, 갑상선암, 부인암, 비뇨기암 등)' WHERE member_id = 'VS5';
UPDATE medicheck_listing SET features = '코성형, 눈성형, 가슴성형, 안티에이징, 재수술 및 재건술' WHERE member_id = 'VS50';
UPDATE medicheck_listing SET features = '시력교정수술, 백내장, 노안수술, 안종합 검사' WHERE member_id = 'VS55';
UPDATE medicheck_listing SET features = '심장뇌혈관, 암수술, 로볼수술, 양성자치료, 감마나이프' WHERE member_id = 'VS6';
UPDATE medicheck_listing SET features = '현미경 눈성형, 줄기세포 피부치료, 줄기세포 탈모치료, EBD(energybased device)치료' WHERE member_id = 'VS62';
UPDATE medicheck_listing SET features = '코성형, 콧볼축소, 안티에이징, 쁘띠성형' WHERE member_id = 'VS63';
UPDATE medicheck_listing SET features = 'Plastic surgery and skin treatments' WHERE member_id = 'VS64';
UPDATE medicheck_listing SET features = '노안 백내장 스마일라식 라섹 렌즈삽입술·망막·녹내장·각막이식·안구건조증·드림렌즈·영양주사' WHERE member_id = 'VS65';
UPDATE medicheck_listing SET features = '시력교정수술, 노안, 백내장수술, 눈종합검진' WHERE member_id = 'VS68';
UPDATE medicheck_listing SET features = '희귀질환 소아환자, 난치성 소아환자, 중증 암환자, 이식 환자, 건강검진' WHERE member_id = 'VS7';
UPDATE medicheck_listing SET features = '앙코르눈밑지, 쌍꺼풀수술, 쿨스컬프팅, 레이저리프팅' WHERE member_id = 'VS72';
UPDATE medicheck_listing SET features = '질성형수술, 소음순수술, 질타이트닝, 처녀막재생수술, 여성질환 검진' WHERE member_id = 'VS74';
UPDATE medicheck_listing SET features = '암, 성형외과, 어린이 병원, 심장질환, 최소침습수술, 다빈치 로봇수술, 장기이식 수술' WHERE member_id = 'VS8';
UPDATE medicheck_listing SET features = '울쎄라 써마지 리프팅, 맞춤형 안티에이징 피부 관리, 흉터 및 색소 치료, 주름 완화 보톡스, 볼륨증대 윤곽 개선 필러' WHERE member_id = 'VS84';
UPDATE medicheck_listing SET features = '암/종양(종양내과 소아혈액종양과 방사선종양과 사이버나이프 중성자 치료 등), ·심장혈관(심장내과 소아심장과 등), ·재활의학과(수치료 로봇재활치료 등), ·외과(갑상선내분비외과 간담췌외과 대장항문외과 유방외과 등), ·신경/신경외과(뇌졸중 뇌전증 뇌경색 뇌종양 뇌출혈 뇌동맥류 등) ·내과(내분비내과 소화기내과 신장내과 혈액내과 호흡기내과 등) ·기타(마취통증의학과 비뇨의학과 정형외과 피부과 산부인과 이비인후과 등' WHERE member_id = 'VS9';
UPDATE medicheck_listing SET features = '성대단축술 /전유합후진술, 후두미세수술, KTP레이저술' WHERE member_id = 'VS98';
