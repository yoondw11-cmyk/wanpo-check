"use client";

import { useEffect, useState } from "react";

const APP_URL = "https://wanpo-check.vercel.app";

const surfaceData = {
  asphalt: { labelKo: "아스팔트", labelJa: "アスファルト", bonus: 10 },
  concrete: { labelKo: "콘크리트", labelJa: "コンクリート", bonus: 6 },
  dirt: { labelKo: "흙길", labelJa: "土の道", bonus: 3 },
  grass: { labelKo: "잔디", labelJa: "芝生", bonus: 1 },
};

const sunData = {
  direct: { labelKo: "직사광선", labelJa: "直射日光", bonus: 10 },
  partial: { labelKo: "반그늘", labelJa: "半日陰", bonus: 5 },
  shade: { labelKo: "그늘", labelJa: "日陰", bonus: 0 },
};

const breedData = {
  shiba: {
    labelKo: "시바견",
    labelJa: "柴犬",
    image: "/dogs/shiba.png",
    bg: "from-orange-100 to-amber-200",
  },
  toyPoodle: {
    labelKo: "토이푸들",
    labelJa: "トイプードル",
    image: "/dogs/toy-poodle.png",
    bg: "from-pink-100 to-rose-200",
  },
  poodle: {
    labelKo: "푸들",
    labelJa: "プードル",
    image: "/dogs/poodle.png",
    bg: "from-pink-100 to-purple-200",
  },
  chihuahua: {
    labelKo: "치와와",
    labelJa: "チワワ",
    image: "/dogs/chihuahua.png",
    bg: "from-yellow-100 to-orange-200",
  },
  dachshund: {
    labelKo: "닥스훈트",
    labelJa: "ダックスフンド",
    image: "/dogs/dachshund.png",
    bg: "from-amber-100 to-yellow-200",
  },
  pomeranian: {
    labelKo: "포메라니안",
    labelJa: "ポメラニアン",
    image: "/dogs/pomeranian.png",
    bg: "from-orange-100 to-red-200",
  },
  maltese: {
    labelKo: "말티즈",
    labelJa: "マルチーズ",
    image: "/dogs/maltese.png",
    bg: "from-slate-100 to-blue-100",
  },
  bichon: {
    labelKo: "비숑 프리제",
    labelJa: "ビションフリーゼ",
    image: "/dogs/bichon.png",
    bg: "from-sky-100 to-slate-200",
  },
  yorkshireTerrier: {
    labelKo: "요크셔테리어",
    labelJa: "ヨークシャーテリア",
    image: "/dogs/yorkshire-terrier.png",
    bg: "from-yellow-100 to-stone-200",
  },
  miniatureSchnauzer: {
    labelKo: "미니어처 슈나우저",
    labelJa: "ミニチュアシュナウザー",
    image: "/dogs/miniature-schnauzer.png",
    bg: "from-slate-100 to-zinc-300",
  },
  frenchBulldog: {
    labelKo: "프렌치 불독",
    labelJa: "フレンチブルドッグ",
    image: "/dogs/french-bulldog.png",
    bg: "from-stone-100 to-orange-200",
  },
  pug: {
    labelKo: "퍼그",
    labelJa: "パグ",
    image: "/dogs/pug.png",
    bg: "from-yellow-100 to-stone-200",
  },
  corgi: {
    labelKo: "웰시코기",
    labelJa: "ウェルシュコーギー",
    image: "/dogs/corgi.png",
    bg: "from-orange-100 to-yellow-200",
  },
  goldenRetriever: {
    labelKo: "골든 리트리버",
    labelJa: "ゴールデンレトリバー",
    image: "/dogs/golden-retriever.png",
    bg: "from-yellow-100 to-amber-300",
  },
  labradorRetriever: {
    labelKo: "래브라도 리트리버",
    labelJa: "ラブラドールレトリバー",
    image: "/dogs/labrador-retriever.png",
    bg: "from-amber-100 to-lime-200",
  },
  beagle: {
    labelKo: "비글",
    labelJa: "ビーグル",
    image: "/dogs/beagle.png",
    bg: "from-amber-100 to-orange-200",
  },
  borderCollie: {
    labelKo: "보더콜리",
    labelJa: "ボーダーコリー",
    image: "/dogs/border-collie.png",
    bg: "from-slate-100 to-blue-200",
  },
  samoyed: {
    labelKo: "사모예드",
    labelJa: "サモエド",
    image: "/dogs/samoyed.png",
    bg: "from-blue-100 to-slate-100",
  },
  papillon: {
    labelKo: "파피용",
    labelJa: "パピヨン",
    image: "/dogs/papillon.png",
    bg: "from-purple-100 to-pink-200",
  },
  shihTzu: {
    labelKo: "시츄",
    labelJa: "シーズー",
    image: "/dogs/shih-tzu.png",
    bg: "from-pink-100 to-yellow-100",
  },
  jackRussellTerrier: {
    labelKo: "잭 러셀 테리어",
    labelJa: "ジャックラッセルテリア",
    image: "/dogs/jack-russell-terrier.png",
    bg: "from-lime-100 to-yellow-200",
  },
  minPin: {
    labelKo: "미니어처 핀셔",
    labelJa: "ミニチュアピンシャー",
    image: "/dogs/min-pin.png",
    bg: "from-zinc-100 to-red-100",
  },
  italianGreyhound: {
    labelKo: "이탈리안 그레이하운드",
    labelJa: "イタリアングレーハウンド",
    image: "/dogs/italian-greyhound.png",
    bg: "from-sky-100 to-indigo-100",
  },
  cavalier: {
    labelKo: "카발리에",
    labelJa: "キャバリア",
    image: "/dogs/cavalier.png",
    bg: "from-rose-100 to-amber-100",
  },
  sheltie: {
    labelKo: "셰틀랜드 쉽독",
    labelJa: "シェットランドシープドッグ",
    image: "/dogs/sheltie.png",
    bg: "from-amber-100 to-green-100",
  },
  akita: {
    labelKo: "아키타견",
    labelJa: "秋田犬",
    image: "/dogs/akita.png",
    bg: "from-orange-100 to-stone-200",
  },
  husky: {
    labelKo: "허스키",
    labelJa: "ハスキー",
    image: "/dogs/husky.png",
    bg: "from-blue-100 to-slate-200",
  },
  bernese: {
    labelKo: "버니즈 마운틴 독",
    labelJa: "バーニーズマウンテンドッグ",
    image: "/dogs/bernese.png",
    bg: "from-stone-100 to-emerald-100",
  },
  mixed: {
    labelKo: "믹스견",
    labelJa: "ミックス",
    image: "/dogs/mixed.png",
    bg: "from-green-100 to-emerald-200",
  },
};

type SurfaceType = keyof typeof surfaceData;
type SunType = keyof typeof sunData;
type BreedType = keyof typeof breedData;
type Language = "ko" | "ja";

type WeatherData = {
  temperature: number;
  windSpeed: number;
  cloudCover: number;
  radiation: number;
};

type HourlyWeather = {
  time: string;
  temperature: number;
  windSpeed: number;
  cloudCover: number;
  radiation: number;
};

type DogSex = "unknown" | "male" | "female";
type NeuteredStatus = "unknown" | "yes" | "no";

type DogProfile = {
  name: string;
  breed: BreedType;
  birthday?: string;
  weight?: string;
  sex?: DogSex;
  neutered?: NeuteredStatus;
  allergies?: string;
  medicalNotes?: string;
};

function getText(lang: Language) {
  return {
    appName: "ワン歩チェック",
    title: lang === "ko" ? "산책해도댕?" : "お散歩チェック",
    setupTitle: lang === "ko" ? "산책해도댕?" : "お散歩行けるワン？",
    setupSubtitle:
      lang === "ko"
        ? "먼저 우리 강아지 정보를 등록해볼게요."
        : "まずはワンちゃんの情報を登録しましょう。",
    dogName: lang === "ko" ? "강아지 이름" : "ワンちゃんの名前",
    dogNamePlaceholder: lang === "ko" ? "예: 쿠키" : "例：ポチ",
    breed: lang === "ko" ? "강아지 종류" : "犬種",
    start: lang === "ko" ? "시작하기" : "はじめる",
    languageButton: lang === "ko" ? "日本語" : "한국어",
    todayCheck: lang === "ko" ? "오늘의 산책 체크" : "今日のお散歩チェック",
    nowWalkQuestion:
      lang === "ko" ? "는 지금 산책해도댕?" : "、今お散歩行ける？",
    resetProfile:
      lang === "ko" ? "강아지 정보 다시 설정" : "ワンちゃん情報を再設定",
    locationWeather: lang === "ko" ? "현재 위치/날씨" : "現在地/天気",
    currentTemp: lang === "ko" ? "현재 기온" : "現在の気温",
    wind: lang === "ko" ? "풍속" : "風速",
    cloud: lang === "ko" ? "구름" : "雲量",
    radiation: lang === "ko" ? "일사량" : "日射量",
    groundTemp: lang === "ko" ? "예상 지면온도" : "予想路面温度",
    surface: lang === "ko" ? "바닥 종류" : "地面の種類",
    sun: lang === "ko" ? "햇빛 상태" : "日差し",
    recommendedTime: lang === "ko" ? "추천 산책 시간" : "おすすめのお散歩時間",
    handTest: lang === "ko" ? "손등 7초 테스트" : "手の甲7秒テスト",
    handTestDesc:
      lang === "ko"
        ? "산책 전, 손등을 지면에 대고 7초 동안 버틸 수 있는지 확인해보세요."
        : "お散歩前に、手の甲を地面につけて7秒間耐えられるか確認しましょう。",
    handTestRunning:
      lang === "ko"
        ? "손등을 지면에 대고 유지해주세요."
        : "手の甲を地面につけたままにしてください。",
    handTestDone:
      lang === "ko"
        ? "7초 동안 괜찮았다면 산책 가능성이 높아요. 그래도 강아지 상태를 보면서 짧게 시작해주세요."
        : "7秒間大丈夫なら、お散歩できる可能性が高いです。ただし様子を見ながら短めに始めましょう。",
    timerStart: lang === "ko" ? "시작" : "開始",
    timerReset: lang === "ko" ? "리셋" : "リセット",
    loading: lang === "ko" ? "잠시만 기다려주세요..." : "少々お待ちください...",
    needName:
      lang === "ko"
        ? "강아지 이름을 입력해주세요."
        : "ワンちゃんの名前を入力してください。",
    cautionTitle:
      lang === "ko" ? "산책 전 꼭 확인해주세요" : "お散歩前に必ず確認してください",
    cautionMain:
      lang === "ko"
        ? "이 앱의 지면온도는 실제 측정값이 아니라 날씨, 일사량, 바닥 종류를 바탕으로 계산한 추정값입니다."
        : "このアプリの路面温度は実測値ではなく、天気・日射量・地面の種類をもとにした推定値です。",
    cautionSub:
      lang === "ko"
        ? "산책 전 손등 7초 테스트와 강아지의 호흡, 걸음걸이, 컨디션을 함께 확인해주세요."
        : "お散歩前には手の甲7秒テストと、ワンちゃんの呼吸・歩き方・体調も一緒に確認してください。",
    tempGuideTitle:
      lang === "ko" ? "강아지 산책 지면온도 기준" : "お散歩の路面温度目安",
    shareTitle: lang === "ko" ? "앱 공유하기" : "アプリを共有する",
    shareDescription:
      lang === "ko"
        ? "여름철 강아지 산책 가능 여부를 날씨와 예상 지면온도로 확인할 수 있는 앱입니다."
        : "夏のお散歩前に、天気と予想路面温度から安全度を確認できるアプリです。",
    copyIntro: lang === "ko" ? "소개문 복사" : "紹介文をコピー",
    shareButton: lang === "ko" ? "공유하기" : "共有する",
    copied: lang === "ko" ? "복사했어요" : "コピーしました",
  };
}

function calculateGroundTemperature(
  airTemperature: number,
  surface: SurfaceType,
  sun: SunType,
  weather: WeatherData | HourlyWeather | null
) {
  const surfaceBonus = surfaceData[surface].bonus;
  const sunBonus = sunData[sun].bonus;

  const windPenalty = weather
    ? Math.min(Math.round(weather.windSpeed / 2), 4)
    : 0;
  const cloudPenalty = weather ? Math.round(weather.cloudCover / 20) : 0;
  const radiationBonus = weather
    ? Math.min(Math.round(weather.radiation / 120), 8)
    : 0;

  return Math.round(
    airTemperature +
      surfaceBonus +
      sunBonus +
      radiationBonus -
      windPenalty -
      cloudPenalty
  );
}

function getRiskMessage(temp: number, lang: Language) {
  if (temp <= 35) {
    return {
      label: lang === "ko" ? "산책 가능해요" : "お散歩できます",
      className: "bg-green-100 text-green-700",
      recommendation:
        lang === "ko"
          ? "일반 산책이 가능해요. 그래도 물은 꼭 챙겨주세요."
          : "通常のお散歩ができそうです。お水は必ず持って行きましょう。",
    };
  }

  if (temp <= 40) {
    return {
      label: lang === "ko" ? "짧게 산책 가능해요" : "短めなら大丈夫そう",
      className: "bg-yellow-100 text-yellow-700",
      recommendation:
        lang === "ko"
          ? "짧은 산책은 가능하지만, 중간중간 쉬어주세요."
          : "短めのお散歩なら可能ですが、こまめに休ませてください。",
    };
  }

  if (temp <= 45) {
    return {
      label: lang === "ko" ? "조심해야 해요" : "注意が必要です",
      className: "bg-orange-100 text-orange-700",
      recommendation:
        lang === "ko"
          ? "손등 7초 테스트를 먼저 해보고, 짧게 산책하세요."
          : "手の甲7秒テストをしてから、短めにしてください。",
    };
  }

  if (temp <= 50) {
    return {
      label: lang === "ko" ? "지금은 위험해요" : "今は危険です",
      className: "bg-red-100 text-red-600",
      recommendation:
        lang === "ko"
          ? "가능하면 산책을 미루고, 배변 산책만 짧게 해주세요."
          : "できればお散歩は後にして、トイレ散歩だけ短くしてください。",
    };
  }

  return {
    label: lang === "ko" ? "산책하지 마세요" : "お散歩は避けましょう",
    className: "bg-zinc-200 text-zinc-800",
    recommendation:
      lang === "ko"
        ? "지면 온도가 너무 높아요. 실내 놀이로 대체하세요."
        : "地面の温度が高すぎます。室内遊びに切り替えましょう。",
  };
}

function formatHour(timeText: string) {
  const date = new Date(timeText);

  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatDayAndHour(timeText: string, lang: Language) {
  const date = new Date(timeText);
  const now = new Date();

  const isSameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  const isTomorrow =
    date.getFullYear() === tomorrow.getFullYear() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getDate() === tomorrow.getDate();

  const time = date.toLocaleTimeString(lang === "ko" ? "ko-KR" : "ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  if (isSameDay) {
    return lang === "ko" ? `오늘 ${time}` : `今日 ${time}`;
  }

  if (isTomorrow) {
    return lang === "ko" ? `내일 ${time}` : `明日 ${time}`;
  }

  return lang === "ko"
    ? `${date.getMonth() + 1}월 ${date.getDate()}일 ${time}`
    : `${date.getMonth() + 1}月${date.getDate()}日 ${time}`;
}

function findRecommendedWalkTime(
  hourlyWeather: HourlyWeather[],
  surface: SurfaceType,
  sun: SunType,
  lang: Language
) {
  const now = new Date();

  const futureHours = hourlyWeather.filter((item) => {
    const itemTime = new Date(item.time);
    return itemTime.getTime() >= now.getTime();
  });

  const safeHour = futureHours.find((item) => {
    const estimatedGroundTemp = calculateGroundTemperature(
      item.temperature,
      surface,
      sun,
      item
    );

    return estimatedGroundTemp <= 35;
  });

  if (!safeHour) {
    return {
      label:
        lang === "ko"
          ? "오늘은 늦은 밤 또는 내일 아침 권장"
          : "今夜遅く、または明日の朝がおすすめ",
      detail:
        lang === "ko"
          ? "앞으로 24시간 안에 충분히 안전한 시간이 뚜렷하지 않아요."
          : "今後24時間以内に十分安全な時間が見つかりませんでした。",
    };
  }

  const estimatedTemp = calculateGroundTemperature(
    safeHour.temperature,
    surface,
    sun,
    safeHour
  );

  return {
    label:
      lang === "ko"
        ? `${formatDayAndHour(safeHour.time, lang)} 이후`
        : `${formatDayAndHour(safeHour.time, lang)}以降`,
    detail:
      lang === "ko"
        ? `예상 지면온도 약 ${estimatedTemp}℃로 내려갈 가능성이 있어요.`
        : `予想路面温度が約${estimatedTemp}℃まで下がる可能性があります。`,
  };
}

function getShareText(lang: Language) {
  if (lang === "ko") {
    return `강아지 여름 산책 전 지면온도를 확인해보세요.

ワン歩チェック / 산책해도댕?
날씨, 일사량, 바닥 종류를 바탕으로 예상 지면온도와 추천 산책 시간을 알려주는 앱입니다.

${APP_URL}`;
  }

  return `夏のお散歩前に、路面温度をチェックしてみてください。

ワン歩チェック
天気・日射量・地面の種類をもとに、予想路面温度とおすすめのお散歩時間を確認できるアプリです。

${APP_URL}`;
}


function calculateDogAge(birthday: string | undefined, lang: Language) {
  if (!birthday) {
    return lang === "ko" ? "미입력" : "未入力";
  }

  const birthDate = new Date(birthday);

  if (Number.isNaN(birthDate.getTime())) {
    return lang === "ko" ? "미입력" : "未入力";
  }

  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();

  if (today.getDate() < birthDate.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years <= 0 && months <= 0) {
    return lang === "ko" ? "1개월 미만" : "1か月未満";
  }

  if (years <= 0) {
    return lang === "ko" ? `${months}개월` : `${months}か月`;
  }

  if (months <= 0) {
    return lang === "ko" ? `${years}살` : `${years}歳`;
  }

  return lang === "ko" ? `${years}살 ${months}개월` : `${years}歳 ${months}か月`;
}

function getSexLabel(sex: DogSex | undefined, lang: Language) {
  if (sex === "male") return lang === "ko" ? "남아" : "男の子";
  if (sex === "female") return lang === "ko" ? "여아" : "女の子";
  return lang === "ko" ? "미입력" : "未入力";
}

function getNeuteredLabel(status: NeuteredStatus | undefined, lang: Language) {
  if (status === "yes") return lang === "ko" ? "완료" : "済み";
  if (status === "no") return lang === "ko" ? "미완료" : "未実施";
  return lang === "ko" ? "미입력" : "未入力";
}

function getEmptyText(lang: Language) {
  return lang === "ko" ? "미입력" : "未入力";
}

export default function Home() {
  const [lang, setLang] = useState<Language>("ko");

  const [dogProfile, setDogProfile] = useState<DogProfile | null>(null);
  const [dogNameInput, setDogNameInput] = useState("");
  const [breedInput, setBreedInput] = useState<BreedType>("shiba");
  const [birthdayInput, setBirthdayInput] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [sexInput, setSexInput] = useState<DogSex>("unknown");
  const [neuteredInput, setNeuteredInput] =
    useState<NeuteredStatus>("unknown");
  const [allergyInput, setAllergyInput] = useState("");
  const [medicalNoteInput, setMedicalNoteInput] = useState("");

  const [selectedSurface, setSelectedSurface] =
    useState<SurfaceType>("asphalt");
  const [selectedSun, setSelectedSun] = useState<SunType>("direct");

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeather[]>([]);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [weatherStatusType, setWeatherStatusType] = useState<
    "loading" | "success" | "fallback" | "unsupported" | "denied"
  >("loading");
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timer, setTimer] = useState(7);
  const [timerFinished, setTimerFinished] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  const t = getText(lang);

  useEffect(() => {
    const savedProfile = localStorage.getItem("wanpo-dog-profile");
    const savedLang = localStorage.getItem("wanpo-language");

    if (savedProfile) {
      try {
        setDogProfile(JSON.parse(savedProfile));
      } catch {
        localStorage.removeItem("wanpo-dog-profile");
      }
    }

    if (savedLang === "ko" || savedLang === "ja") {
      setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wanpo-language", lang);
  }, [lang]);

  const activeBreed = dogProfile
    ? breedData[dogProfile.breed]
    : breedData[breedInput];

  const locationText =
    latitude !== null && longitude !== null
      ? lang === "ko"
        ? `위도 ${latitude.toFixed(2)}, 경도 ${longitude.toFixed(2)}`
        : `緯度 ${latitude.toFixed(2)}, 経度 ${longitude.toFixed(2)}`
      : lang === "ko"
        ? "위치 확인 중..."
        : "位置を確認中...";

  const weatherStatusText =
    weatherStatusType === "success"
      ? lang === "ko"
        ? "실제 날씨와 시간별 예보 반영 중"
        : "現在の天気と時間別予報を反映中"
      : weatherStatusType === "fallback"
        ? lang === "ko"
          ? "날씨 정보를 가져오지 못해 기본값 26℃를 사용 중"
          : "天気情報を取得できないため、初期値26℃を使用中"
        : weatherStatusType === "unsupported"
          ? lang === "ko"
            ? "이 브라우저는 위치 정보를 지원하지 않아요."
            : "このブラウザは位置情報に対応していません。"
          : weatherStatusType === "denied"
            ? lang === "ko"
              ? "위치 권한이 없어 기본값 26℃를 사용 중"
              : "位置情報の許可がないため、初期値26℃を使用中"
            : lang === "ko"
              ? "날씨 정보를 불러오는 중..."
              : "天気情報を取得中...";

  const airTemperature = weather?.temperature ?? 26;

  const groundTemperature = calculateGroundTemperature(
    airTemperature,
    selectedSurface,
    selectedSun,
    weather
  );

  const currentSurface = surfaceData[selectedSurface];
  const currentSun = sunData[selectedSun];
  const risk = getRiskMessage(groundTemperature, lang);

  const recommendedWalkTime =
    hourlyWeather.length > 0
      ? findRecommendedWalkTime(hourlyWeather, selectedSurface, selectedSun, lang)
      : {
          label: lang === "ko" ? "계산 중..." : "計算中...",
          detail:
            lang === "ko"
              ? "시간별 예보를 불러오고 있어요."
              : "時間ごとの予報を取得しています。",
        };

  const previewHours = hourlyWeather
    .filter((item) => {
      const itemTime = new Date(item.time);
      return itemTime.getTime() >= new Date().getTime();
    })
    .slice(0, 6)
    .map((item) => {
      const estimatedGroundTemp = calculateGroundTemperature(
        item.temperature,
        selectedSurface,
        selectedSun,
        item
      );

      return {
        time: formatHour(item.time),
        groundTemp: estimatedGroundTemp,
      };
    });

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    APP_URL
  )}`;

  useEffect(() => {
    async function fetchWeather(
      currentLatitude: number,
      currentLongitude: number
    ) {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${currentLatitude}&longitude=${currentLongitude}&current=temperature_2m,wind_speed_10m,cloud_cover,shortwave_radiation&hourly=temperature_2m,wind_speed_10m,cloud_cover,shortwave_radiation&forecast_days=2&timezone=auto`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("날씨 API 호출 실패");
        }

        const data = await response.json();

        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          windSpeed: Math.round(data.current.wind_speed_10m),
          cloudCover: Math.round(data.current.cloud_cover),
          radiation: Math.round(data.current.shortwave_radiation),
        });

        const hourly: HourlyWeather[] = data.hourly.time.map(
          (time: string, index: number) => ({
            time,
            temperature: Math.round(data.hourly.temperature_2m[index]),
            windSpeed: Math.round(data.hourly.wind_speed_10m[index]),
            cloudCover: Math.round(data.hourly.cloud_cover[index]),
            radiation: Math.round(data.hourly.shortwave_radiation[index]),
          })
        );

        setHourlyWeather(hourly);
        setWeatherStatusType("success");
      } catch (error) {
        console.error(error);
        setWeatherStatusType("fallback");
      } finally {
        setIsLoadingWeather(false);
      }
    }

    if (!navigator.geolocation) {
      setWeatherStatusType("unsupported");
      setIsLoadingWeather(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLatitude = position.coords.latitude;
        const currentLongitude = position.coords.longitude;

        setLatitude(currentLatitude);
        setLongitude(currentLongitude);
        fetchWeather(currentLatitude, currentLongitude);
      },
      () => {
        setWeatherStatusType("denied");
        setIsLoadingWeather(false);
      }
    );
  }, []);

  useEffect(() => {
    if (!isTimerRunning) return;

    if (timer === 0) {
      setIsTimerRunning(false);
      setTimerFinished(true);
      return;
    }

    const intervalId = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isTimerRunning, timer]);

  function toggleLanguage() {
    setLang((currentLang) => {
      const nextLang = currentLang === "ko" ? "ja" : "ko";
      localStorage.setItem("wanpo-language", nextLang);
      return nextLang;
    });
  }

  function saveDogProfile() {
    const trimmedName = dogNameInput.trim();

    if (!trimmedName) {
      alert(t.needName);
      return;
    }

    const profile: DogProfile = {
      name: trimmedName,
      breed: breedInput,
      birthday: birthdayInput,
      weight: weightInput.trim(),
      sex: sexInput,
      neutered: neuteredInput,
      allergies: allergyInput.trim(),
      medicalNotes: medicalNoteInput.trim(),
    };

    setDogProfile(profile);
    localStorage.setItem("wanpo-dog-profile", JSON.stringify(profile));
  }

  function resetDogProfile() {
    if (dogProfile) {
      setDogNameInput(dogProfile.name);
      setBreedInput(dogProfile.breed);
      setBirthdayInput(dogProfile.birthday ?? "");
      setWeightInput(dogProfile.weight ?? "");
      setSexInput(dogProfile.sex ?? "unknown");
      setNeuteredInput(dogProfile.neutered ?? "unknown");
      setAllergyInput(dogProfile.allergies ?? "");
      setMedicalNoteInput(dogProfile.medicalNotes ?? "");
    } else {
      setDogNameInput("");
      setBreedInput("shiba");
      setBirthdayInput("");
      setWeightInput("");
      setSexInput("unknown");
      setNeuteredInput("unknown");
      setAllergyInput("");
      setMedicalNoteInput("");
    }

    setDogProfile(null);
  }

  function startTimer() {
    setTimer(7);
    setTimerFinished(false);
    setIsTimerRunning(true);
  }

  function resetTimer() {
    setTimer(7);
    setTimerFinished(false);
    setIsTimerRunning(false);
  }

  async function copyShareText() {
    const shareText = getShareText(lang);

    try {
      await navigator.clipboard.writeText(shareText);
      setCopyStatus(t.copied);
      setTimeout(() => setCopyStatus(""), 2000);
    } catch {
      setCopyStatus(lang === "ko" ? "복사에 실패했어요" : "コピーに失敗しました");
      setTimeout(() => setCopyStatus(""), 2000);
    }
  }

  async function shareApp() {
    const shareText = getShareText(lang);

    if (navigator.share) {
      try {
        await navigator.share({
          title: "ワン歩チェック / 산책해도댕?",
          text: shareText,
          url: APP_URL,
        });
      } catch {
        return;
      }
    } else {
      await copyShareText();
    }
  }

  if (!dogProfile) {
    return (
      <main
        className={`min-h-screen bg-gradient-to-b ${activeBreed.bg} p-6 text-slate-900`}
      >
        <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center">
          <section className="relative overflow-hidden rounded-3xl bg-white/85 p-6 shadow-2xl backdrop-blur">
            <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/40 opacity-40" />

            <div className="relative z-20 mb-6 flex justify-end">
              <button
                type="button"
                onClick={toggleLanguage}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white"
              >
                {t.languageButton}
              </button>
            </div>

            <div className="relative z-10 text-center">
              <p className="text-sm font-semibold text-blue-500">{t.appName}</p>
              <h1 className="mt-2 text-4xl font-black">{t.setupTitle}</h1>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {t.setupSubtitle}
              </p>
            </div>

            <div className="relative z-10 mt-8">
              <label className="text-sm font-bold text-slate-700">
                {t.dogName}
              </label>
              <input
                value={dogNameInput}
                onChange={(e) => setDogNameInput(e.target.value)}
                placeholder={t.dogNamePlaceholder}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-lg font-bold outline-none focus:border-blue-400"
              />
            </div>

            <div className="relative z-10 mt-5">
              <p className="mb-2 text-sm font-bold text-slate-700">{t.breed}</p>

              <div className="grid max-h-96 grid-cols-2 gap-3 overflow-y-auto pr-1">
                {Object.entries(breedData).map(([key, breed]) => {
                  const isSelected = breedInput === key;

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setBreedInput(key as BreedType)}
                      className={`flex flex-col items-center justify-center rounded-3xl px-3 py-4 text-sm font-bold shadow transition ${
                        isSelected
                          ? "bg-slate-900 text-white"
                          : "bg-white text-slate-700"
                      }`}
                    >
                      <div
                        className={`mb-2 flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl ${
                          isSelected ? "bg-white" : "bg-blue-50"
                        }`}
                      >
                        <img
                          src={breed.image}
                          alt={lang === "ko" ? breed.labelKo : breed.labelJa}
                          className="h-full w-full object-contain p-1"
                        />
                      </div>

                      <span className="text-center leading-5">
                        {lang === "ko" ? breed.labelKo : breed.labelJa}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>


            <div className="relative z-10 mt-5 rounded-3xl bg-white p-4 shadow-inner">
              <p className="mb-3 text-sm font-black text-slate-700">
                {lang === "ko" ? "강아지 기본 정보" : "ワンちゃんの基本情報"}
              </p>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-bold text-slate-700">
                    {lang === "ko" ? "생일" : "誕生日"}
                  </label>
                  <input
                    type="date"
                    value={birthdayInput}
                    onChange={(e) => setBirthdayInput(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-bold outline-none focus:border-blue-400"
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    {lang === "ko"
                      ? `자동 계산 나이: ${calculateDogAge(birthdayInput, lang)}`
                      : `自動計算の年齢: ${calculateDogAge(birthdayInput, lang)}`}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700">
                    {lang === "ko" ? "체중 kg" : "体重 kg"}
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={weightInput}
                    onChange={(e) => setWeightInput(e.target.value)}
                    placeholder={lang === "ko" ? "예: 5.2" : "例：5.2"}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-bold outline-none focus:border-blue-400"
                  />
                </div>

                <div>
                  <p className="mb-2 text-sm font-bold text-slate-700">
                    {lang === "ko" ? "성별" : "性別"}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      {
                        value: "unknown",
                        labelKo: "미입력",
                        labelJa: "未入力",
                      },
                      {
                        value: "male",
                        labelKo: "남아",
                        labelJa: "男の子",
                      },
                      {
                        value: "female",
                        labelKo: "여아",
                        labelJa: "女の子",
                      },
                    ].map((item) => {
                      const isSelected = sexInput === item.value;

                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setSexInput(item.value as DogSex)}
                          className={`rounded-2xl px-3 py-3 text-sm font-black shadow ${
                            isSelected
                              ? "bg-blue-500 text-white"
                              : "bg-white text-slate-700"
                          }`}
                        >
                          {lang === "ko" ? item.labelKo : item.labelJa}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-bold text-slate-700">
                    {lang === "ko" ? "중성화 여부" : "避妊・去勢"}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      {
                        value: "unknown",
                        labelKo: "미입력",
                        labelJa: "未入力",
                      },
                      {
                        value: "yes",
                        labelKo: "완료",
                        labelJa: "済み",
                      },
                      {
                        value: "no",
                        labelKo: "미완료",
                        labelJa: "未実施",
                      },
                    ].map((item) => {
                      const isSelected = neuteredInput === item.value;

                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() =>
                            setNeuteredInput(item.value as NeuteredStatus)
                          }
                          className={`rounded-2xl px-3 py-3 text-sm font-black shadow ${
                            isSelected
                              ? "bg-slate-900 text-white"
                              : "bg-white text-slate-700"
                          }`}
                        >
                          {lang === "ko" ? item.labelKo : item.labelJa}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700">
                    {lang === "ko" ? "알레르기 / 주의사항" : "アレルギー・注意事項"}
                  </label>
                  <textarea
                    value={allergyInput}
                    onChange={(e) => setAllergyInput(e.target.value)}
                    placeholder={
                      lang === "ko"
                        ? "예: 닭고기 알레르기, 더위에 약함"
                        : "例：鶏肉アレルギー、暑さに弱い"
                    }
                    className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700">
                    {lang === "ko" ? "주의해야 할 질병 / 메모" : "持病・メモ"}
                  </label>
                  <textarea
                    value={medicalNoteInput}
                    onChange={(e) => setMedicalNoteInput(e.target.value)}
                    placeholder={
                      lang === "ko"
                        ? "예: 슬개골 주의, 심장질환, 피부질환 등"
                        : "例：膝蓋骨に注意、心疾患、皮膚疾患など"
                    }
                    className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-blue-400"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={saveDogProfile}
              className="relative z-20 mt-7 w-full rounded-2xl bg-blue-500 px-4 py-4 text-lg font-black text-white shadow-lg"
            >
              {t.start}
            </button>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`min-h-screen bg-gradient-to-b ${activeBreed.bg} p-6 text-slate-900`}
    >
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center">
        <section className="relative overflow-hidden rounded-3xl bg-white/85 p-6 shadow-2xl backdrop-blur">
          <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/40 opacity-40" />

          <div className="relative z-20 mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-blue-500">{t.appName}</p>
              <h1 className="text-3xl font-black">{t.title}</h1>
            </div>

            <button
              type="button"
              onClick={toggleLanguage}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white"
            >
              {t.languageButton}
            </button>
          </div>

          <div className="relative z-10 mb-5 rounded-3xl bg-white p-4 shadow">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl bg-white shadow-inner">
                  <img
                    src={breedData[dogProfile.breed].image}
                    alt={
                      lang === "ko"
                        ? breedData[dogProfile.breed].labelKo
                        : breedData[dogProfile.breed].labelJa
                    }
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    {lang === "ko"
                      ? `${breedData[dogProfile.breed].labelKo} · ${t.todayCheck}`
                      : `${breedData[dogProfile.breed].labelJa} · ${t.todayCheck}`}
                  </p>
                  <p className="text-xl font-black">
                    {dogProfile.name}
                    {t.nowWalkQuestion}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={resetDogProfile}
                className="shrink-0 rounded-full bg-slate-100 px-4 py-2 text-xs font-black text-slate-600"
              >
                {lang === "ko" ? "수정" : "編集"}
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="font-bold text-slate-400">
                  {lang === "ko" ? "나이" : "年齢"}
                </p>
                <p className="mt-1 font-black text-slate-700">
                  {calculateDogAge(dogProfile.birthday, lang)}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="font-bold text-slate-400">
                  {lang === "ko" ? "체중" : "体重"}
                </p>
                <p className="mt-1 font-black text-slate-700">
                  {dogProfile.weight
                    ? `${dogProfile.weight} kg`
                    : getEmptyText(lang)}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="font-bold text-slate-400">
                  {lang === "ko" ? "성별" : "性別"}
                </p>
                <p className="mt-1 font-black text-slate-700">
                  {getSexLabel(dogProfile.sex, lang)}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="font-bold text-slate-400">
                  {lang === "ko" ? "중성화" : "避妊・去勢"}
                </p>
                <p className="mt-1 font-black text-slate-700">
                  {getNeuteredLabel(dogProfile.neutered, lang)}
                </p>
              </div>
            </div>

            {(dogProfile.allergies || dogProfile.medicalNotes) && (
              <div className="mt-3 rounded-2xl bg-red-50 p-3 text-xs leading-5 text-slate-700">
                <p className="font-black text-red-600">
                  {lang === "ko" ? "주의 정보" : "注意情報"}
                </p>

                {dogProfile.allergies && (
                  <p className="mt-1">
                    <span className="font-bold">
                      {lang === "ko"
                        ? "알레르기/주의사항: "
                        : "アレルギー・注意事項: "}
                    </span>
                    {dogProfile.allergies}
                  </p>
                )}

                {dogProfile.medicalNotes && (
                  <p className="mt-1">
                    <span className="font-bold">
                      {lang === "ko" ? "질병/메모: " : "持病・メモ: "}
                    </span>
                    {dogProfile.medicalNotes}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="relative z-10 mb-5 rounded-2xl bg-white p-4 shadow">
            <p className="text-sm font-bold text-slate-700">
              {t.locationWeather}
            </p>
            <p className="mt-1 text-sm text-slate-500">{locationText}</p>
            <p className="mt-1 text-sm text-slate-500">{weatherStatusText}</p>

            {isLoadingWeather && (
              <p className="mt-2 text-sm font-semibold text-blue-500">
                {t.loading}
              </p>
            )}
          </div>

          <div className="relative z-10 rounded-3xl bg-blue-50 p-5 shadow-inner">
            <p className="text-sm text-slate-500">{t.currentTemp}</p>
            <div className="mt-1 flex items-end gap-2">
              <span className="text-3xl font-black">{airTemperature}</span>
              <span className="mb-1 text-lg font-semibold">℃</span>
            </div>

            {weather && (
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs text-slate-600">
                <div className="rounded-xl bg-white p-2">
                  <p className="font-bold">{t.wind}</p>
                  <p>{weather.windSpeed} km/h</p>
                </div>
                <div className="rounded-xl bg-white p-2">
                  <p className="font-bold">{t.cloud}</p>
                  <p>{weather.cloudCover}%</p>
                </div>
                <div className="rounded-xl bg-white p-2">
                  <p className="font-bold">{t.radiation}</p>
                  <p>{weather.radiation} W/m²</p>
                </div>
              </div>
            )}

            <p className="mt-5 text-sm text-slate-500">
              {t.groundTemp} ·{" "}
              {lang === "ko" ? currentSurface.labelKo : currentSurface.labelJa} ·{" "}
              {lang === "ko" ? currentSun.labelKo : currentSun.labelJa}
            </p>

            <div className="mt-2 flex items-end gap-2">
              <span className="text-7xl font-black">{groundTemperature}</span>
              <span className="mb-3 text-2xl font-semibold">℃</span>
            </div>

            <p
              className={`mt-3 rounded-full px-4 py-3 text-center font-black ${risk.className}`}
            >
              {risk.label}
            </p>
          </div>

          <div className="relative z-10 mt-5">
            <p className="mb-2 text-sm font-bold text-slate-600">
              {t.surface}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(surfaceData).map(([key, surface]) => {
                const isSelected = selectedSurface === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedSurface(key as SurfaceType)}
                    className={`rounded-2xl px-4 py-3 font-bold shadow ${
                      isSelected
                        ? "bg-slate-900 text-white"
                        : "bg-white text-slate-700"
                    }`}
                  >
                    {lang === "ko" ? surface.labelKo : surface.labelJa}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 mt-5">
            <p className="mb-2 text-sm font-bold text-slate-600">{t.sun}</p>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(sunData).map(([key, sun]) => {
                const isSelected = selectedSun === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedSun(key as SunType)}
                    className={`rounded-2xl px-3 py-3 text-sm font-bold shadow ${
                      isSelected
                        ? "bg-blue-500 text-white"
                        : "bg-white text-slate-700"
                    }`}
                  >
                    {lang === "ko" ? sun.labelKo : sun.labelJa}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 mt-5 rounded-3xl bg-amber-50 p-4 shadow-inner">
            <p className="text-sm font-bold text-amber-700">
              {t.recommendedTime}
            </p>
            <p className="mt-1 text-lg font-black">
              {recommendedWalkTime.label}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {recommendedWalkTime.detail}
            </p>

            {previewHours.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                {previewHours.map((item) => (
                  <div key={item.time} className="rounded-xl bg-white p-2">
                    <p className="font-bold text-slate-700">{item.time}</p>
                    <p className="text-slate-500">{item.groundTemp}℃</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative z-10 mt-5 rounded-3xl bg-white p-4 shadow">
            <p className="text-sm font-bold text-slate-700">{t.handTest}</p>
            <p className="mt-1 text-sm text-slate-500">{t.handTestDesc}</p>

            <div className="mt-4 flex items-center justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-4xl font-black text-blue-600">
                {timer}
              </div>
            </div>

            {isTimerRunning && (
              <p className="mt-3 text-center text-sm font-bold text-blue-600">
                {t.handTestRunning}
              </p>
            )}

            {timerFinished && (
              <p className="mt-3 rounded-2xl bg-green-100 px-4 py-3 text-center text-sm font-bold text-green-700">
                {t.handTestDone}
              </p>
            )}

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={startTimer}
                disabled={isTimerRunning}
                className="rounded-2xl bg-blue-500 px-4 py-4 text-base font-black text-white shadow-lg disabled:bg-slate-300"
              >
                {t.timerStart}
              </button>
              <button
                type="button"
                onClick={resetTimer}
                className="rounded-2xl bg-slate-100 px-4 py-4 text-base font-black text-slate-700 shadow"
              >
                {t.timerReset}
              </button>
            </div>
          </div>

          <div className="relative z-10 mt-5 rounded-3xl bg-slate-50 p-4 shadow">
            <p className="text-sm font-black text-slate-700">
              {t.tempGuideTitle}
            </p>

            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between rounded-2xl bg-green-100 px-3 py-2 text-green-800">
                <span>35℃ 이하</span>
                <span>산책 가능</span>
              </div>
              <div className="flex justify-between rounded-2xl bg-yellow-100 px-3 py-2 text-yellow-800">
                <span>36–40℃</span>
                <span>짧게 가능</span>
              </div>
              <div className="flex justify-between rounded-2xl bg-orange-100 px-3 py-2 text-orange-800">
                <span>41–45℃</span>
                <span>주의 필요</span>
              </div>
              <div className="flex justify-between rounded-2xl bg-red-100 px-3 py-2 text-red-700">
                <span>46–50℃</span>
                <span>위험</span>
              </div>
              <div className="flex justify-between rounded-2xl bg-zinc-200 px-3 py-2 text-zinc-800">
                <span>50℃ 이상</span>
                <span>산책 피하기</span>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-white px-4 py-3 text-xs leading-5 text-slate-600">
              <p className="font-bold text-slate-700">{t.cautionTitle}</p>
              <p className="mt-1">{t.cautionMain}</p>
              <p className="mt-1">{t.cautionSub}</p>
            </div>
          </div>
               
          <div className="relative z-10 mt-5 rounded-3xl bg-white p-4 shadow">
            <p className="text-sm font-black text-slate-700">{t.shareTitle}</p>
            <p className="mt-1 text-sm text-slate-500">{t.shareDescription}</p>

            <div className="mt-4 flex flex-col items-center rounded-3xl bg-slate-50 p-4">
              <img
                src={qrCodeUrl}
                alt="QR code"
                className="h-40 w-40 rounded-2xl bg-white p-2 shadow"
              />
              <p className="mt-3 break-all text-center text-xs font-bold text-blue-600">
                {APP_URL}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={copyShareText}
                className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-black text-white shadow"
              >
                {t.copyIntro}
              </button>
              <button
                type="button"
                onClick={shareApp}
                className="rounded-2xl bg-blue-500 px-4 py-3 text-sm font-black text-white shadow"
              >
                {t.shareButton}
              </button>
            </div>

            {copyStatus && (
              <p className="mt-3 text-center text-sm font-bold text-blue-600">
                {copyStatus}
              </p>
            )}

            <div className="mt-4 rounded-2xl bg-blue-50 p-3 text-xs leading-5 text-slate-600">
              <p className="font-bold text-slate-700">
                {lang === "ko" ? "공유용 소개문" : "紹介文"}
              </p>
              <p className="mt-1 whitespace-pre-line">{getShareText(lang)}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}