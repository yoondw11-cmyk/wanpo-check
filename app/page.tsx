"use client";

import { useEffect, useState } from "react";

const APP_URL = "https://wanpo-check.vercel.app";

const surfaceData = {
  asphalt: { labelKo: "아스팔트", labelJa: "アスファルト", bonus: 10 },
  concrete: { labelKo: "콘크리트", labelJa: "コンクリート", bonus: 6 },
  pavingBlock: { labelKo: "보도블럭", labelJa: "歩道ブロック", bonus: 5 },
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
  recentSunFactor?: number;
  uvIndex?: number;
  airQualityIndex?: number;
  pm25?: number;
  pm10?: number;
};

type HourlyWeather = {
  time: string;
  temperature: number;
  windSpeed: number;
  cloudCover: number;
  radiation: number;
  recentSunFactor?: number;
  uvIndex?: number;
  airQualityIndex?: number;
  pm25?: number;
  pm10?: number;
};

type OpenMeteoAirQualityData = {
  hourly?: {
    time?: string[];
    pm10?: Array<number | null>;
    pm2_5?: Array<number | null>;
    european_aqi?: Array<number | null>;
    uv_index?: Array<number | null>;
  };
};


type VetClinic = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  address: string;
  phone: string;
  openingHours: string;
  distanceKm: number;
  serviceLabel: string;
  serviceClassName: string;
  note: string;
  mapUrl: string;
  directionsUrl: string;
  infoUrl: string;
  phoneUrl: string | null;
};

type FavoriteVet = {
  name: string;
  phone: string;
  address: string;
  openingHours: string;
  memo: string;
};


type DogFriendlySpot = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  distanceKm: number;
  kindLabel: string;
  kindClassName: string;
  note: string;
  mapUrl: string;
  directionsUrl: string;
};

const surfaceHeatData: Record<
  SurfaceType,
  { storedHeat: number; maxSolarHeat: number; thermalMemoryHeat: number }
> = {
  asphalt: { storedHeat: 2, maxSolarHeat: 18, thermalMemoryHeat: 8 },
  concrete: { storedHeat: 1, maxSolarHeat: 14, thermalMemoryHeat: 6 },
  pavingBlock: { storedHeat: 1, maxSolarHeat: 12, thermalMemoryHeat: 5 },
  grass: { storedHeat: -1, maxSolarHeat: 4, thermalMemoryHeat: 1.5 },
};

const sunExposureData: Record<SunType, number> = {
  direct: 1,
  partial: 0.55,
  shade: 0.15,
};

type DogSex = "unknown" | "male" | "female";
type NeuteredStatus = "unknown" | "yes" | "no";

type VaccinationRecord = {
  rabiesLastDate?: string;
  rabiesNextDate?: string;
  comboLastDate?: string;
  comboNextDate?: string;
  otherVaccineName?: string;
  otherLastDate?: string;
  otherNextDate?: string;
};

type MedicationRecord = {
  heartwormMedicineName?: string;
  heartwormLastDate?: string;
  heartwormNextDate?: string;
  fleaTickMedicineName?: string;
  fleaTickLastDate?: string;
  fleaTickNextDate?: string;
  reminderEnabled?: boolean;
};

type DogProfile = {
  id: string;
  name: string;
  breed: BreedType;
  birthday?: string;
  weight?: string;
  sex?: DogSex;
  neutered?: NeuteredStatus;
  allergies?: string;
  medicalNotes?: string;
  vaccination?: VaccinationRecord;
  medication?: MedicationRecord;
};

function getText(lang: Language) {
  return {
    appName: "ワン歩チェック",
    title: lang === "ko" ? "산책해도댕?" : "散歩行けるワン？",
    setupTitle: lang === "ko" ? "산책해도댕?" : "散歩行けるワン？",
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
      lang === "ko" ? "는 지금 산책해도댕?" : "、今お散歩行けるワン？",
    resetProfile:
      lang === "ko" ? "강아지 정보 다시 설정" : "ワンちゃん情報を再設定",
    locationWeather: lang === "ko" ? "현재 위치/날씨" : "現在地/天気",
    currentTemp: lang === "ko" ? "현재 기온" : "現在気温",
    wind: lang === "ko" ? "풍속" : "風速",
    cloud: lang === "ko" ? "구름" : "雲量",
    radiation: lang === "ko" ? "일사량" : "日射量",
    uvIndex: lang === "ko" ? "자외선" : "UV指数",
    airQuality: lang === "ko" ? "대기질" : "空気質",
    pm25: lang === "ko" ? "초미세먼지" : "PM2.5",
    groundTemp: lang === "ko" ? "예상 지면온도" : "予想路面温度",
    surface: lang === "ko" ? "바닥 종류" : "地面の種類",
    sun: lang === "ko" ? "햇빛 상태" : "日差し",
    recommendedTime: lang === "ko" ? "추천 산책 시간" : "おすすめ時間",
    handTest: lang === "ko" ? "손등 7초 테스트" : "手の甲7秒テスト",
    handTestDesc:
      lang === "ko"
        ? "산책 전, 손등을 지면에 대고 7초 동안 버틸 수 있는지 확인해보세요."
        : "手の甲を地面に7秒つけて確認しましょう。",
    handTestRunning:
      lang === "ko"
        ? "손등을 지면에 대고 유지해주세요."
        : "手の甲を地面につけたままにしてください。",
    handTestDone:
      lang === "ko"
        ? "7초 동안 괜찮았다면 산책 가능성이 높아요. 그래도 강아지 상태를 보면서 짧게 시작해주세요."
        : "7秒大丈夫なら可能性あり。様子を見て短めに。",
    timerStart: lang === "ko" ? "시작" : "開始",
    timerReset: lang === "ko" ? "리셋" : "リセット",
    loading: lang === "ko" ? "잠시만 기다려주세요..." : "少々お待ちください...",
    needName:
      lang === "ko"
        ? "강아지 이름을 입력해주세요."
        : "ワンちゃんの名前を入力してください。",
    cautionTitle:
      lang === "ko" ? "산책 전 꼭 확인해주세요" : "お散歩前の確認",
    cautionMain:
      lang === "ko"
        ? "이 앱의 지면온도는 실제 측정값이 아니라 날씨, 일사량, 바닥 종류를 바탕으로 계산한 추정값입니다."
        : "路面温度は実測値ではなく、天気・日射量・地面からの推定値です。",
    cautionSub:
      lang === "ko"
        ? "산책 전 손등 7초 테스트와 강아지의 호흡, 걸음걸이, 컨디션을 함께 확인해주세요."
        : "手の甲7秒テストと、呼吸・歩き方・体調も確認してください。",
    tempGuideTitle:
      lang === "ko" ? "강아지 산책 지면온도 기준" : "お散歩の路面温度目安",
    guideSourceNote:
      lang === "ko"
        ? "참고: 수의사 및 동물보호단체의 고온 포장도로 주의 권장사항과 손등 7초 테스트를 바탕으로 한 앱용 참고 기준입니다."
        : "参考：獣医師・動物保護団体の高温舗装路への注意喚起と手の甲7秒テストをもとにした目安です。",
    shareTitle: lang === "ko" ? "앱 공유하기" : "アプリを共有する",
    shareDescription:
      lang === "ko"
        ? "여름철 강아지 산책 가능 여부를 날씨와 예상 지면온도로 확인할 수 있는 앱입니다."
        : "天気と予想路面温度から安全度を確認できます。",
    copyIntro: lang === "ko" ? "소개문 복사" : "紹介文をコピー",
    shareButton: lang === "ko" ? "공유하기" : "共有する",
    copied: lang === "ko" ? "복사했어요" : "コピーしました",
  };
}

function clampNumber(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function findNearestTimeIndex(times: string[], targetTime: string) {
  const target = new Date(targetTime).getTime();

  if (Number.isNaN(target)) {
    return -1;
  }

  let nearestIndex = -1;
  let nearestDiff = Number.POSITIVE_INFINITY;

  times.forEach((timeText, index) => {
    const time = new Date(timeText).getTime();

    if (Number.isNaN(time)) return;

    const diff = Math.abs(time - target);

    if (diff < nearestDiff) {
      nearestDiff = diff;
      nearestIndex = index;
    }
  });

  return nearestIndex;
}

function calculateRecentSunFactor(
  radiations: Array<number | null | undefined>,
  targetIndex: number
) {
  if (targetIndex < 0) {
    return 0;
  }

  // 현재 시간과 직전 3시간의 일사량을 가중 평균합니다.
  // 해가 진 뒤에도 직전 햇빛의 잔열이 서서히 빠지도록 하기 위한 계수입니다.
  const weights = [0.4, 0.3, 0.2, 0.1];

  return weights.reduce((total, weight, offset) => {
    const index = targetIndex - offset;
    const radiation = index >= 0 ? radiations[index] ?? 0 : 0;
    return total + clampNumber(radiation, 0, 900) / 900 * weight;
  }, 0);
}

function calculateGroundTemperature(
  airTemperature: number,
  surface: SurfaceType,
  sun: SunType,
  weather: WeatherData | HourlyWeather | null
) {
  const surfaceHeat = surfaceHeatData[surface];

  const radiation = weather ? clampNumber(weather.radiation, 0, 900) : 0;
  const radiationFactor = radiation / 900;
  const cloudCover = weather ? clampNumber(weather.cloudCover, 0, 100) : 0;
  const windSpeed = weather ? Math.max(weather.windSpeed, 0) : 0;
  const uvIndex = weather?.uvIndex ?? 0;
  const recentSunFactor = clampNumber(weather?.recentSunFactor ?? radiationFactor, 0, 1);

  // 기본 온도: 공기 온도 + 바닥 자체 저장열 - 바람에 의한 표면 냉각
  const windCooling = Math.min(windSpeed * 0.18, 3.5);
  const baseTemperature =
    airTemperature + surfaceHeat.storedHeat - windCooling;

  // 구름은 현재 햇빛 가열을 약하게 만들지만, 직사광선/그늘 순서를 뒤집지 않도록 제한합니다.
  const cloudDamping = 1 - (cloudCover / 100) * 0.35;

  const calculateByExposure = (exposure: number, shadeCooling: number) => {
    const currentSolarHeating =
      surfaceHeat.maxSolarHeat * radiationFactor * cloudDamping * exposure;
    const uvHeating =
      Math.min(uvIndex * 0.25, 2.5) * radiationFactor * cloudDamping * exposure;

    // 직전 몇 시간 햇빛 누적에 의한 바닥 잔열.
    // 현재 일사량이 0에 가까운 해질녘에도, 이전 햇빛이 강했다면 천천히 식도록 반영합니다.
    const exposureMemory = 0.35 + exposure * 0.65;
    const storedSolarHeating =
      surfaceHeat.thermalMemoryHeat * recentSunFactor * exposureMemory;

    return Math.round(
      baseTemperature +
        currentSolarHeating +
        uvHeating +
        storedSolarHeating -
        shadeCooling
    );
  };

  const shadeTemperature = calculateByExposure(0.08, 0.8);
  const partialTemperature = Math.max(
    shadeTemperature,
    calculateByExposure(0.45, 0.3)
  );
  const directTemperature = Math.max(
    partialTemperature,
    calculateByExposure(1, 0)
  );

  if (sun === "direct") return directTemperature;
  if (sun === "partial") return partialTemperature;
  return shadeTemperature;
}
function getAirQualityValues(
  airQualityData: OpenMeteoAirQualityData | null,
  time: string
) {
  const times = airQualityData?.hourly?.time;

  if (!times || times.length === 0) {
    return {};
  }

  const targetTime = new Date(time).getTime();
  let index = times.indexOf(time);

  if (index < 0 && !Number.isNaN(targetTime)) {
    let nearestIndex = -1;
    let nearestDiff = Number.POSITIVE_INFINITY;

    times.forEach((itemTime, itemIndex) => {
      const itemDateTime = new Date(itemTime).getTime();

      if (Number.isNaN(itemDateTime)) return;

      const diff = Math.abs(itemDateTime - targetTime);

      if (diff < nearestDiff) {
        nearestDiff = diff;
        nearestIndex = itemIndex;
      }
    });

    if (nearestIndex >= 0 && nearestDiff <= 1000 * 60 * 90) {
      index = nearestIndex;
    }
  }

  if (index < 0) {
    return {};
  }

  const uvIndex = airQualityData.hourly?.uv_index?.[index];
  const airQualityIndex = airQualityData.hourly?.european_aqi?.[index];
  const pm25 = airQualityData.hourly?.pm2_5?.[index];
  const pm10 = airQualityData.hourly?.pm10?.[index];

  return {
    uvIndex: typeof uvIndex === "number" ? Math.round(uvIndex * 10) / 10 : undefined,
    airQualityIndex:
      typeof airQualityIndex === "number" ? Math.round(airQualityIndex) : undefined,
    pm25: typeof pm25 === "number" ? Math.round(pm25) : undefined,
    pm10: typeof pm10 === "number" ? Math.round(pm10) : undefined,
  };
}

function getAirQualityLabel(value: number | undefined, lang: Language) {
  if (value === undefined) {
    return "-";
  }

  if (value <= 20) return lang === "ko" ? "좋음" : "良い";
  if (value <= 40) return lang === "ko" ? "보통" : "普通";
  if (value <= 60) return lang === "ko" ? "주의" : "注意";
  if (value <= 80) return lang === "ko" ? "나쁨" : "悪い";
  if (value <= 100) return lang === "ko" ? "매우 나쁨" : "非常に悪い";
  return lang === "ko" ? "위험" : "危険";
}

function getUvLabel(value: number | undefined, lang: Language) {
  if (value === undefined) {
    return "-";
  }

  if (value < 3) return lang === "ko" ? "낮음" : "低い";
  if (value < 6) return lang === "ko" ? "보통" : "中程度";
  if (value < 8) return lang === "ko" ? "높음" : "高い";
  if (value < 11) return lang === "ko" ? "매우 높음" : "非常に高い";
  return lang === "ko" ? "위험" : "危険";
}

function getPm25Label(value: number | undefined, lang: Language) {
  if (value === undefined) {
    return "-";
  }

  if (value <= 9) return lang === "ko" ? "낮음" : "低い";
  if (value <= 35) return lang === "ko" ? "보통" : "普通";
  if (value <= 55) return lang === "ko" ? "높음" : "高い";
  return lang === "ko" ? "매우 높음" : "非常に高い";
}


function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

function getVetAddress(tags: Record<string, string>) {
  const parts = [
    tags["addr:postcode"],
    tags["addr:state"],
    tags["addr:city"],
    tags["addr:suburb"],
    tags["addr:street"],
    tags["addr:housenumber"],
  ].filter(Boolean);

  return parts.join(" ");
}

function getVetServiceInfo(
  tags: Record<string, string>,
  lang: Language
): Pick<VetClinic, "serviceLabel" | "serviceClassName" | "note"> {
  const openingHours = (tags.opening_hours || "").toLowerCase();
  const name = (tags.name || "").toLowerCase();
  const description = (tags.description || "").toLowerCase();
  const operator = (tags.operator || "").toLowerCase();
  const combinedText = `${name} ${description} ${operator}`;

  const hasStrictTwentyFourHourMark =
    openingHours.includes("24/7") ||
    openingHours.includes("24 hours") ||
    openingHours.includes("24h") ||
    combinedText.includes("24h") ||
    combinedText.includes("24時間") ||
    combinedText.includes("24時") ||
    combinedText.includes("24시간");

  if (hasStrictTwentyFourHourMark) {
    return {
      serviceLabel: lang === "ko" ? "24시간 표시 후보" : "24時間表示あり",
      serviceClassName: "bg-green-100 text-green-700",
      note:
        lang === "ko"
          ? "공개 지도 데이터에 24시간 표시가 있는 후보예요. 실제 진료 가능 여부는 정보확인에서 반드시 확인해주세요."
          : "公開地図データに24時間表示がある候補です。実際の診療可否は情報確認で必ずご確認ください。",
    };
  }

  return {
    serviceLabel: lang === "ko" ? "제외" : "除外",
    serviceClassName: "bg-slate-100 text-slate-700",
    note:
      lang === "ko"
        ? "24시간 표시가 없어 목록에서 제외되는 병원입니다."
        : "24時間表示がないため一覧から除外されます。",
  };
}

function normalizeVetClinic(
  item: any,
  userLat: number,
  userLon: number,
  lang: Language
): VetClinic | null {
  const lat = item.lat ?? item.center?.lat;
  const lon = item.lon ?? item.center?.lon;
  const tags = item.tags ?? {};

  if (typeof lat !== "number" || typeof lon !== "number") {
    return null;
  }

  const name =
    tags.name ||
    (lang === "ko" ? "이름 미확인 동물병원" : "名称未確認の動物病院");
  const address = getVetAddress(tags) || (lang === "ko" ? "주소 정보 없음" : "住所情報なし");
  const phone =
    tags.phone || tags["contact:phone"] || tags["contact:mobile"] || "";
  const openingHours =
    tags.opening_hours ||
    (lang === "ko" ? "영업시간 정보 없음" : "診療時間情報なし");
  const serviceInfo = getVetServiceInfo(tags, lang);
  const distanceKm = calculateDistanceKm(userLat, userLon, lat, lon);

  return {
    id: String(item.id),
    name,
    lat,
    lon,
    address,
    phone,
    openingHours,
    distanceKm,
    serviceLabel: serviceInfo.serviceLabel,
    serviceClassName: serviceInfo.serviceClassName,
    note: serviceInfo.note,
    mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${lat},${lon}`)}`,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`,
    infoUrl: `https://www.google.com/search?q=${encodeURIComponent(`${name} 動物病院 24時間 住所 電話番号 営業時間`)}`,
    phoneUrl: phone ? `tel:${phone.replace(/[^+\d]/g, "")}` : null,
  };
}

function formatDistanceText(distanceKm: number, lang: Language) {
  if (distanceKm < 1) {
    const meters = Math.round(distanceKm * 1000);
    return lang === "ko" ? `${meters}m` : `${meters}m`;
  }

  return `${distanceKm.toFixed(1)}km`;
}


async function fetchOverpassElements(query: string) {
  const endpoints = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass.openstreetmap.ru/api/interpreter",
  ];

  let lastError: unknown = null;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({ data: query }).toString(),
      });

      if (!response.ok) {
        throw new Error(`Overpass API error: ${response.status}`);
      }

      const data = await response.json();
      return Array.isArray(data.elements) ? data.elements : [];
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("Overpass API 호출 실패");
}


function normalizeDogFriendlySpot(
  item: any,
  userLat: number,
  userLon: number,
  lang: Language
): DogFriendlySpot | null {
  const lat = item.lat ?? item.center?.lat;
  const lon = item.lon ?? item.center?.lon;
  const tags = item.tags ?? {};

  if (typeof lat !== "number" || typeof lon !== "number") {
    return null;
  }

  const leisure = tags.leisure || "";
  const highway = tags.highway || "";
  const waterway = tags.waterway || "";
  const natural = tags.natural || "";
  const landuse = tags.landuse || "";

  let kindLabel = lang === "ko" ? "산책 장소" : "お散歩スポット";
  let kindClassName = "bg-slate-100 text-slate-700";
  let note =
    lang === "ko"
      ? "공개 지도 데이터 기반 산책 장소예요."
      : "公開地図データにもとづく散歩スポットです。";
  let fallbackName = lang === "ko" ? "이름 없는 산책 장소" : "名前未登録の散歩スポット";

  if (leisure === "dog_park") {
    kindLabel = lang === "ko" ? "도그 파크" : "ドッグパーク";
    kindClassName = "bg-blue-100 text-blue-700";
    note =
      lang === "ko"
        ? "강아지가 쉬거나 뛰놀기 좋은 도그 파크예요."
        : "ワンちゃんが遊びやすいドッグパークです。";
    fallbackName = lang === "ko" ? "근처 도그 파크" : "近くのドッグパーク";
  } else if (leisure === "park") {
    kindLabel = lang === "ko" ? "공원" : "公園";
    kindClassName = "bg-green-100 text-green-700";
    note =
      lang === "ko"
        ? "가볍게 산책하기 좋은 근처 공원이에요."
        : "気軽に散歩しやすい近くの公園です。";
    fallbackName = lang === "ko" ? "근처 공원" : "近くの公園";
  } else if (highway === "footway" || highway === "path" || highway === "pedestrian") {
    kindLabel = lang === "ko" ? "산책로" : "散歩道";
    kindClassName = "bg-amber-100 text-amber-700";
    note =
      lang === "ko"
        ? "걷기 좋은 길로 표시된 산책로예요."
        : "歩きやすい道として登録された散歩道です。";
    fallbackName = lang === "ko" ? "근처 산책로" : "近くの散歩道";
  } else if (waterway === "riverbank" || natural === "water") {
    kindLabel = lang === "ko" ? "강변 / 수변" : "川辺・水辺";
    kindClassName = "bg-sky-100 text-sky-700";
    note =
      lang === "ko"
        ? "강변이나 수변 주변 산책 후보예요."
        : "川辺や水辺の散歩候補です。";
    fallbackName = lang === "ko" ? "근처 강변길" : "近くの川辺";
  } else if (leisure === "garden" || landuse === "grass") {
    kindLabel = lang === "ko" ? "녹지" : "緑地";
    kindClassName = "bg-emerald-100 text-emerald-700";
    note =
      lang === "ko"
        ? "잔디나 녹지 공간으로 표시된 곳이에요."
        : "芝生や緑地として表示された場所です。";
    fallbackName = lang === "ko" ? "근처 녹지" : "近くの緑地";
  }

  const name = tags.name || fallbackName;
  const distanceKm = calculateDistanceKm(userLat, userLon, lat, lon);

  return {
    id: String(item.id),
    name,
    lat,
    lon,
    distanceKm,
    kindLabel,
    kindClassName,
    note,
    mapUrl: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`,
  };
}


type SeasonalRiskCard = {
  title: string;
  badge: string;
  badgeClass: string;
  cardClass: string;
  bullets: string[];
};

function getCurrentSeasonName(month: number, lang: Language) {
  if (month >= 3 && month <= 5) {
    return lang === "ko" ? "봄" : "春";
  }

  if (month >= 6 && month <= 8) {
    return lang === "ko" ? "여름" : "夏";
  }

  if (month >= 9 && month <= 11) {
    return lang === "ko" ? "가을" : "秋";
  }

  return lang === "ko" ? "겨울" : "冬";
}

function getSeasonalRiskCards(
  lang: Language,
  weather: WeatherData | null,
  groundTemperature: number
): SeasonalRiskCard[] {
  const month = new Date().getMonth() + 1;
  const warmSeason = month >= 4 && month <= 11;
  const rainySeason = month >= 6 && month <= 7;
  const peakSummer = month >= 7 && month <= 9;
  const autumnTickSeason = month >= 9 && month <= 11;
  const coldSeason = month === 12 || month <= 2;

  const tickCard: SeasonalRiskCard = {
    title: lang === "ko" ? "진드기 / 벼룩" : "マダニ・ノミ",
    badge:
      rainySeason || peakSummer
        ? lang === "ko"
          ? "활동 높음"
          : "活動高め"
        : warmSeason || autumnTickSeason
          ? lang === "ko"
            ? "주의"
            : "注意"
          : lang === "ko"
            ? "낮음"
            : "低め",
    badgeClass:
      rainySeason || peakSummer
        ? "bg-red-100 text-red-700"
        : warmSeason || autumnTickSeason
          ? "bg-amber-100 text-amber-700"
          : "bg-green-100 text-green-700",
    cardClass:
      rainySeason || peakSummer
        ? "bg-red-50"
        : warmSeason || autumnTickSeason
          ? "bg-amber-50"
          : "bg-green-50",
    bullets:
      lang === "ko"
        ? [
            rainySeason || peakSummer
              ? "지금은 진드기·벼룩 활동이 활발한 시기예요. 풀숲, 강변, 수풀 산책은 특히 주의하세요."
              : warmSeason || autumnTickSeason
                ? "산책 후 발, 배, 겨드랑이, 귀 뒤를 꼭 확인해주세요."
                : "겨울철에는 상대적으로 낮지만 실내외 이동이 많은 아이는 계속 확인이 필요해요.",
            "벼룩·진드기 예방약 날짜를 놓치지 말고, 산책 후 브러싱을 해주세요.",
          ]
        : [
            rainySeason || peakSummer
              ? "今はマダニ・ノミが活発な時期です。草むら、川辺、茂みの散歩は特に注意しましょう。"
              : warmSeason || autumnTickSeason
                ? "散歩後は足、わき、耳の後ろ、お腹まわりを確認してください。"
                : "冬は比較的低めですが、継続してチェックすると安心です。",
            "予防薬の日付を忘れず、散歩後はブラッシングすると安心です。",
          ],
  };

  const infectionCard: SeasonalRiskCard = {
    title: lang === "ko" ? "감염병 / 유행성 질환" : "感染症・流行性疾患",
    badge:
      warmSeason
        ? lang === "ko"
          ? "주의"
          : "注意"
        : lang === "ko"
          ? "기본 주의"
          : "基本注意",
    badgeClass: warmSeason ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-700",
    cardClass: warmSeason ? "bg-orange-50" : "bg-slate-50",
    bullets:
      lang === "ko"
        ? [
            rainySeason || peakSummer
              ? "모기 활동이 늘어나는 시기라 심장사상충 예방을 놓치지 않는 것이 중요해요."
              : "지역 상황에 따라 백신 및 예방약 스케줄을 꾸준히 확인해주세요.",
            rainySeason
              ? "비 온 뒤 고인 물, 젖은 흙길은 렙토스피라 등 위생 위험이 있을 수 있어요."
              : "진드기 매개 감염병 예방을 위해 산책 후 몸 상태를 확인해주세요.",
          ]
        : [
            rainySeason || peakSummer
              ? "蚊が増える時期なので、フィラリア予防を忘れないことが大切です。"
              : "地域状況に合わせてワクチン・予防薬の予定を確認してください。",
            rainySeason
              ? "雨上がりの水たまりや湿った土道は、衛生面に注意しましょう。"
              : "マダニ媒介感染症予防のため、散歩後の体チェックが安心です。",
          ],
  };

  const heatDanger = groundTemperature >= 46 || (weather?.temperature ?? 0) >= 30;
  const heatWarning = groundTemperature >= 41 || (weather?.temperature ?? 0) >= 26;

  const heatCard: SeasonalRiskCard = {
    title: lang === "ko" ? "더위 / 열사병 / 아스팔트" : "暑さ・熱中症・アスファルト",
    badge: heatDanger
      ? lang === "ko"
        ? "위험"
        : "危険"
      : heatWarning
        ? lang === "ko"
          ? "주의"
          : "注意"
        : lang === "ko"
          ? "확인"
          : "確認",
    badgeClass: heatDanger
      ? "bg-red-100 text-red-700"
      : heatWarning
        ? "bg-amber-100 text-amber-700"
        : "bg-green-100 text-green-700",
    cardClass: heatDanger
      ? "bg-red-50"
      : heatWarning
        ? "bg-amber-50"
        : "bg-green-50",
    bullets:
      lang === "ko"
        ? [
            `현재 예상 지면온도 ${groundTemperature}℃ 기준으로, 짧은 산책이라도 발바닥과 호흡 상태를 꼭 확인해주세요.`,
            heatDanger
              ? "한낮 산책보다 이른 아침 또는 해진 뒤 산책이 더 안전해요."
              : "산책 중 물, 그늘, 휴식 시간을 충분히 챙겨주세요.",
          ]
        : [
            `現在の予想路面温度 ${groundTemperature}℃ を目安に、肉球と呼吸状態を確認してください。`,
            heatDanger
              ? "日中よりも早朝や日没後のお散歩が安全です。"
              : "散歩中は水分、日陰、休憩をしっかり確保しましょう。",
          ],
  };

  const severeWeatherCard: SeasonalRiskCard = {
    title: lang === "ko" ? "비 / 태풍 / 폭염 / 한파" : "雨・台風・猛暑・寒波",
    badge:
      rainySeason || peakSummer
        ? lang === "ko"
          ? "계절 주의"
          : "季節注意"
        : coldSeason
          ? lang === "ko"
            ? "한파 주의"
            : "寒波注意"
          : lang === "ko"
            ? "기본 확인"
            : "基本確認",
    badgeClass:
      rainySeason || peakSummer
        ? "bg-sky-100 text-sky-700"
        : coldSeason
          ? "bg-indigo-100 text-indigo-700"
          : "bg-slate-100 text-slate-700",
    cardClass:
      rainySeason || peakSummer
        ? "bg-sky-50"
        : coldSeason
          ? "bg-indigo-50"
          : "bg-slate-50",
    bullets:
      lang === "ko"
        ? [
            rainySeason
              ? "장마철에는 젖은 노면, 미끄럼, 피부 트러블에 주의하고 산책 후 잘 말려주세요."
              : peakSummer
                ? "폭염 경보 수준의 더위에는 실외 산책 대신 실내 놀이를 고려해주세요."
                : coldSeason
                  ? "한파나 눈·얼음길에는 체온 유지와 미끄럼 사고를 조심해주세요."
                  : "강풍·호우 예보가 있으면 실외 산책 대신 짧은 배변 산책을 고려해주세요.",
            rainySeason || (weather?.windSpeed ?? 0) >= 12
              ? "비바람이 강하거나 태풍 예보가 있으면 무리한 외출은 피하는 것이 좋아요."
              : "출발 전 실시간 날씨와 노면 상태를 한 번 더 확인하면 더 안전해요.",
          ]
        : [
            rainySeason
              ? "梅雨時は濡れた路面、すべり、皮膚トラブルに注意し、帰宅後はよく乾かしましょう。"
              : peakSummer
                ? "猛暑レベルの日は屋外散歩より室内遊びを検討してください。"
                : coldSeason
                  ? "寒波や雪・凍結路面では体温低下と転倒に注意してください。"
                  : "強風・大雨予報のときは短いトイレ散歩に切り替えるのも安心です。",
            rainySeason || (weather?.windSpeed ?? 0) >= 12
              ? "風雨が強い日や台風予報時は、無理なお出かけを避けるのがおすすめです。"
              : "出発前に最新の天気と路面状態をもう一度確認しましょう。",
          ],
  };

  return [tickCard, infectionCard, heatCard, severeWeatherCard];
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


function getGroundTemperatureDisplayClass(temp: number) {
  if (temp <= 35) {
    return "text-green-600";
  }

  if (temp <= 40) {
    return "text-yellow-600";
  }

  if (temp <= 45) {
    return "text-orange-600";
  }

  if (temp <= 50) {
    return "text-red-600";
  }

  return "text-zinc-800";
}

function getHeatStressMessage(
  weather: WeatherData | null,
  airTemperature: number,
  groundTemperature: number,
  lang: Language
) {
  const radiation = weather?.radiation ?? 0;
  const uvIndex = weather?.uvIndex ?? 0;
  const windSpeed = weather?.windSpeed ?? 0;

  // 습도는 아직 포함하지 않은 간이 더위 스트레스 지표입니다.
  const stressScore =
    airTemperature +
    Math.min(radiation / 120, 7) +
    Math.min(uvIndex * 0.7, 5) -
    Math.min(windSpeed * 0.15, 3);

  if (airTemperature >= 32 || groundTemperature >= 46 || stressScore >= 35) {
    return {
      label: lang === "ko" ? "더위 스트레스 위험" : "暑さストレス危険",
      className: "bg-red-100 text-red-700",
      detail:
        lang === "ko"
          ? "열사병·탈수 위험이 커요. 가능하면 산책을 미루고 물과 그늘을 우선해주세요."
          : "熱中症・脱水リスクが高めです。できれば散歩を避け、水分と日陰を優先してください。",
    };
  }

  if (airTemperature >= 28 || groundTemperature >= 41 || stressScore >= 30) {
    return {
      label: lang === "ko" ? "더위 스트레스 주의" : "暑さストレス注意",
      className: "bg-amber-100 text-amber-700",
      detail:
        lang === "ko"
          ? "짧게 산책하고, 헐떡임·침흘림·걸음 둔화를 확인해주세요."
          : "短めにして、パンティング・よだれ・歩き方の変化を確認しましょう。",
    };
  }

  if (airTemperature >= 24 || uvIndex >= 3 || radiation >= 450) {
    return {
      label: lang === "ko" ? "더위 스트레스 확인" : "暑さストレス確認",
      className: "bg-yellow-100 text-yellow-700",
      detail:
        lang === "ko"
          ? "대체로 가능하지만 물, 휴식, 그늘을 챙기면 더 안전해요."
          : "基本的には可能ですが、水分・休憩・日陰があると安心です。",
    };
  }

  return {
    label: lang === "ko" ? "더위 스트레스 낮음" : "暑さストレス低め",
    className: "bg-green-100 text-green-700",
    detail:
      lang === "ko"
        ? "열사병 위험은 낮은 편이에요. 그래도 강아지 상태는 계속 봐주세요."
        : "熱中症リスクは低めです。ワンちゃんの様子は確認してください。",
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

ワン歩チェック / 散歩行けるワン？
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

function createDogId() {
  return `dog-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function isBreedType(value: unknown): value is BreedType {
  return typeof value === "string" && value in breedData;
}

function normalizeDogProfile(rawProfile: unknown): DogProfile | null {
  if (!rawProfile || typeof rawProfile !== "object") {
    return null;
  }

  const profile = rawProfile as Partial<DogProfile>;

  if (!profile.name || !isBreedType(profile.breed)) {
    return null;
  }

  return {
    id: profile.id || createDogId(),
    name: profile.name,
    breed: profile.breed,
    birthday: profile.birthday || "",
    weight: profile.weight || "",
    sex: profile.sex || "unknown",
    neutered: profile.neutered || "unknown",
    allergies: profile.allergies || "",
    medicalNotes: profile.medicalNotes || "",
    vaccination: profile.vaccination || {},
    medication: profile.medication || {},
  };
}

function formatSavedDate(dateText: string | undefined, lang: Language) {
  if (!dateText) {
    return getEmptyText(lang);
  }

  const date = new Date(dateText);

  if (Number.isNaN(date.getTime())) {
    return getEmptyText(lang);
  }

  return date.toLocaleDateString(lang === "ko" ? "ko-KR" : "ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function getScheduleStatus(dateText: string | undefined, lang: Language) {
  if (!dateText) {
    return {
      label: getEmptyText(lang),
      className: "bg-slate-100 text-slate-500",
    };
  }

  const target = new Date(dateText);

  if (Number.isNaN(target.getTime())) {
    return {
      label: getEmptyText(lang),
      className: "bg-slate-100 text-slate-500",
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diffDays = Math.ceil(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) {
    return {
      label: lang === "ko" ? "기한 지남" : "期限切れ",
      className: "bg-red-100 text-red-600",
    };
  }

  if (diffDays <= 7) {
    return {
      label: lang === "ko" ? "곧 예정" : "まもなく",
      className: "bg-orange-100 text-orange-700",
    };
  }

  return {
    label: lang === "ko" ? "예정" : "予定",
    className: "bg-green-100 text-green-700",
  };
}

function hasAnyHealthRecord(profile: DogProfile) {
  const vaccination = profile.vaccination;
  const medication = profile.medication;

  return Boolean(
    profile.birthday ||
      profile.weight ||
      profile.sex !== "unknown" ||
      profile.neutered !== "unknown" ||
      profile.allergies ||
      profile.medicalNotes ||
      vaccination?.rabiesLastDate ||
      vaccination?.rabiesNextDate ||
      vaccination?.comboLastDate ||
      vaccination?.comboNextDate ||
      vaccination?.otherVaccineName ||
      vaccination?.otherLastDate ||
      vaccination?.otherNextDate ||
      medication?.heartwormMedicineName ||
      medication?.heartwormLastDate ||
      medication?.heartwormNextDate ||
      medication?.fleaTickMedicineName ||
      medication?.fleaTickLastDate ||
      medication?.fleaTickNextDate
  );
}

export default function Home() {
  const [lang, setLang] = useState<Language>("ko");

  const [dogProfiles, setDogProfiles] = useState<DogProfile[]>([]);
  const [dogProfile, setDogProfile] = useState<DogProfile | null>(null);
  const [activeDogId, setActiveDogId] = useState<string | null>(null);
  const [isAddingDog, setIsAddingDog] = useState(false);
  const [isHealthEditorOpen, setIsHealthEditorOpen] = useState(false);

  const [dogNameInput, setDogNameInput] = useState("");
  const [breedInput, setBreedInput] = useState<BreedType>("shiba");
  const [birthdayInput, setBirthdayInput] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [sexInput, setSexInput] = useState<DogSex>("unknown");
  const [neuteredInput, setNeuteredInput] =
    useState<NeuteredStatus>("unknown");
  const [allergyInput, setAllergyInput] = useState("");
  const [medicalNoteInput, setMedicalNoteInput] = useState("");

  const [rabiesLastInput, setRabiesLastInput] = useState("");
  const [rabiesNextInput, setRabiesNextInput] = useState("");
  const [comboLastInput, setComboLastInput] = useState("");
  const [comboNextInput, setComboNextInput] = useState("");
  const [otherVaccineNameInput, setOtherVaccineNameInput] = useState("");
  const [otherVaccineLastInput, setOtherVaccineLastInput] = useState("");
  const [otherVaccineNextInput, setOtherVaccineNextInput] = useState("");

  const [heartwormMedicineInput, setHeartwormMedicineInput] = useState("");
  const [heartwormLastInput, setHeartwormLastInput] = useState("");
  const [heartwormNextInput, setHeartwormNextInput] = useState("");
  const [fleaTickMedicineInput, setFleaTickMedicineInput] = useState("");
  const [fleaTickLastInput, setFleaTickLastInput] = useState("");
  const [fleaTickNextInput, setFleaTickNextInput] = useState("");
  const [reminderEnabledInput, setReminderEnabledInput] = useState(true);

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
  const [nearbyVets, setNearbyVets] = useState<VetClinic[]>([]);
  const [isLoadingVets, setIsLoadingVets] = useState(false);
  const [vetFetchStatus, setVetFetchStatus] = useState<
    "idle" | "loading" | "success" | "empty" | "error"
  >("idle");
  const [nearbyDogSpots, setNearbyDogSpots] = useState<DogFriendlySpot[]>([]);
  const [isLoadingDogSpots, setIsLoadingDogSpots] = useState(false);
  const [dogSpotFetchStatus, setDogSpotFetchStatus] = useState<
    "idle" | "loading" | "success" | "empty" | "error"
  >("idle");
  const [favoriteVet, setFavoriteVet] = useState<FavoriteVet>({
    name: "",
    phone: "",
    address: "",
    openingHours: "",
    memo: "",
  });
  const [isFavoriteVetEditorOpen, setIsFavoriteVetEditorOpen] = useState(false);
  const [favoriteVetNameInput, setFavoriteVetNameInput] = useState("");
  const [favoriteVetPhoneInput, setFavoriteVetPhoneInput] = useState("");
  const [favoriteVetAddressInput, setFavoriteVetAddressInput] = useState("");
  const [favoriteVetHoursInput, setFavoriteVetHoursInput] = useState("");
  const [favoriteVetMemoInput, setFavoriteVetMemoInput] = useState("");

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timer, setTimer] = useState(7);
  const [timerFinished, setTimerFinished] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [activePage, setActivePage] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const t = getText(lang);
  const isJapanese = lang === "ja";

  useEffect(() => {
    const savedProfiles = localStorage.getItem("wanpo-dog-profiles");
    const savedActiveDogId = localStorage.getItem("wanpo-active-dog-id");
    const oldSavedProfile = localStorage.getItem("wanpo-dog-profile");
    const savedLang = localStorage.getItem("wanpo-language");

    let loadedProfiles: DogProfile[] = [];

    if (savedProfiles) {
      try {
        const parsedProfiles = JSON.parse(savedProfiles);

        if (Array.isArray(parsedProfiles)) {
          loadedProfiles = parsedProfiles
            .map((item) => normalizeDogProfile(item))
            .filter((item): item is DogProfile => Boolean(item))
            .slice(0, 5);
        }
      } catch {
        localStorage.removeItem("wanpo-dog-profiles");
      }
    }

    if (loadedProfiles.length === 0 && oldSavedProfile) {
      try {
        const migratedProfile = normalizeDogProfile(JSON.parse(oldSavedProfile));

        if (migratedProfile) {
          loadedProfiles = [migratedProfile];
          localStorage.setItem(
            "wanpo-dog-profiles",
            JSON.stringify(loadedProfiles)
          );
          localStorage.setItem("wanpo-active-dog-id", migratedProfile.id);
        }
      } catch {
        localStorage.removeItem("wanpo-dog-profile");
      }
    }

    if (loadedProfiles.length > 0) {
      const activeProfile =
        loadedProfiles.find((item) => item.id === savedActiveDogId) ??
        loadedProfiles[0];

      setDogProfiles(loadedProfiles);
      setDogProfile(activeProfile);
      setActiveDogId(activeProfile.id);
      localStorage.setItem("wanpo-active-dog-id", activeProfile.id);
    }

    if (savedLang === "ko" || savedLang === "ja") {
      setLang(savedLang);
    }

    const savedFavoriteVet = localStorage.getItem("wanpo-favorite-vet");

    if (savedFavoriteVet) {
      try {
        const parsedFavoriteVet = JSON.parse(savedFavoriteVet) as Partial<FavoriteVet>;
        setFavoriteVet({
          name: parsedFavoriteVet.name || "",
          phone: parsedFavoriteVet.phone || "",
          address: parsedFavoriteVet.address || "",
          openingHours: parsedFavoriteVet.openingHours || "",
          memo: parsedFavoriteVet.memo || "",
        });
      } catch {
        localStorage.removeItem("wanpo-favorite-vet");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wanpo-language", lang);
  }, [lang]);

  const activeBreed = !dogProfile || isAddingDog
    ? breedData[breedInput]
    : breedData[dogProfile.breed];

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
  const heatStress = getHeatStressMessage(weather, airTemperature, groundTemperature, lang);
  const groundTemperatureDisplayClass = getGroundTemperatureDisplayClass(groundTemperature);

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

  const seasonalRiskCards = getSeasonalRiskCards(lang, weather, groundTemperature);
  const currentSeasonName = getCurrentSeasonName(new Date().getMonth() + 1, lang);

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    APP_URL
  )}`;


  const emergencyVetSearchUrl =
    latitude !== null && longitude !== null
      ? `https://www.google.com/maps/search/${encodeURIComponent(
          "24時間 動物病院"
        )}/@${latitude},${longitude},12z`
      : `https://www.google.com/maps/search/${encodeURIComponent(
          "24時間 動物病院"
        )}`;


  const dogCafeSearchQuery =
    lang === "ko" ? "강아지 동반 카페" : "犬同伴 カフェ 近く";
  const dogRestaurantSearchQuery =
    lang === "ko" ? "강아지 동반 식당" : "犬同伴 レストラン 近く";

  const dogCafeSearchUrl =
    latitude !== null && longitude !== null
      ? `https://www.google.com/maps/search/${encodeURIComponent(
          dogCafeSearchQuery
        )}/@${latitude},${longitude},14z`
      : `https://www.google.com/maps/search/${encodeURIComponent(
          dogCafeSearchQuery
        )}`;

  const dogRestaurantSearchUrl =
    latitude !== null && longitude !== null
      ? `https://www.google.com/maps/search/${encodeURIComponent(
          dogRestaurantSearchQuery
        )}/@${latitude},${longitude},14z`
      : `https://www.google.com/maps/search/${encodeURIComponent(
          dogRestaurantSearchQuery
        )}`;

  useEffect(() => {
    async function fetchWeather(
      currentLatitude: number,
      currentLongitude: number
    ) {
      try {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${currentLatitude}&longitude=${currentLongitude}&current=temperature_2m,wind_speed_10m,cloud_cover,shortwave_radiation&hourly=temperature_2m,wind_speed_10m,cloud_cover,shortwave_radiation&past_days=1&forecast_days=2&timezone=auto`;

        const airQualityUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${currentLatitude}&longitude=${currentLongitude}&hourly=pm10,pm2_5,european_aqi,uv_index&forecast_days=2&timezone=auto`;

        const response = await fetch(weatherUrl);

        if (!response.ok) {
          throw new Error("날씨 API 호출 실패");
        }

        const data = await response.json();

        let airQualityData: OpenMeteoAirQualityData | null = null;

        try {
          const airQualityResponse = await fetch(airQualityUrl);

          if (airQualityResponse.ok) {
            airQualityData = await airQualityResponse.json();
          }
        } catch (error) {
          console.error("대기질 API 호출 실패", error);
        }

        const currentAirQuality = getAirQualityValues(
          airQualityData,
          data.current.time
        );

        const hourlyTimes: string[] = data.hourly.time;
        const hourlyRadiations: Array<number | null> = data.hourly.shortwave_radiation;
        const currentWeatherIndex = findNearestTimeIndex(hourlyTimes, data.current.time);
        const currentRecentSunFactor = calculateRecentSunFactor(
          hourlyRadiations,
          currentWeatherIndex
        );

        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          windSpeed: Math.round(data.current.wind_speed_10m),
          cloudCover: Math.round(data.current.cloud_cover),
          radiation: Math.round(data.current.shortwave_radiation),
          recentSunFactor: currentRecentSunFactor,
          uvIndex: currentAirQuality.uvIndex,
          airQualityIndex: currentAirQuality.airQualityIndex,
          pm25: currentAirQuality.pm25,
          pm10: currentAirQuality.pm10,
        });

        const hourly: HourlyWeather[] = data.hourly.time.map(
          (time: string, index: number) => {
            const hourlyAirQuality = getAirQualityValues(airQualityData, time);

            return {
              time,
              temperature: Math.round(data.hourly.temperature_2m[index]),
              windSpeed: Math.round(data.hourly.wind_speed_10m[index]),
              cloudCover: Math.round(data.hourly.cloud_cover[index]),
              radiation: Math.round(data.hourly.shortwave_radiation[index]),
              recentSunFactor: calculateRecentSunFactor(hourlyRadiations, index),
              uvIndex: hourlyAirQuality.uvIndex,
              airQualityIndex: hourlyAirQuality.airQualityIndex,
              pm25: hourlyAirQuality.pm25,
              pm10: hourlyAirQuality.pm10,
            };
          }
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
    async function fetchNearbyDogSpots(currentLatitude: number, currentLongitude: number) {
      setIsLoadingDogSpots(true);
      setDogSpotFetchStatus("loading");

      try {
        const query = `
          [out:json][timeout:18];
          (
            node["leisure"~"^(dog_park|park|garden)$"](around:5000,${currentLatitude},${currentLongitude});
            way["leisure"~"^(dog_park|park|garden)$"](around:5000,${currentLatitude},${currentLongitude});
            relation["leisure"~"^(dog_park|park|garden)$"](around:5000,${currentLatitude},${currentLongitude});
            way["highway"~"^(footway|path|pedestrian)$"](around:3000,${currentLatitude},${currentLongitude});
            way["waterway"="riverbank"](around:6000,${currentLatitude},${currentLongitude});
            way["natural"="water"](around:5000,${currentLatitude},${currentLongitude});
            way["landuse"="grass"](around:4000,${currentLatitude},${currentLongitude});
          );
          out center tags;
        `;

        const elements = await fetchOverpassElements(query);

        const mapped = elements
          .map((item: any) => normalizeDogFriendlySpot(item, currentLatitude, currentLongitude, lang))
          .filter((item: DogFriendlySpot | null): item is DogFriendlySpot => Boolean(item))
          .sort((a: DogFriendlySpot, b: DogFriendlySpot) => a.distanceKm - b.distanceKm);

        const uniqueMap = new Map<string, DogFriendlySpot>();
        mapped.forEach((spot: DogFriendlySpot) => {
          const key = `${spot.kindLabel}-${spot.name}`;
          if (!uniqueMap.has(key)) {
            uniqueMap.set(key, spot);
          }
        });

        const spots = Array.from(uniqueMap.values()).slice(0, 8);
        setNearbyDogSpots(spots);
        setDogSpotFetchStatus(spots.length > 0 ? "success" : "empty");
      } catch (error) {
        console.error(error);
        setNearbyDogSpots([]);
        setDogSpotFetchStatus("error");
      } finally {
        setIsLoadingDogSpots(false);
      }
    }

    if (latitude === null || longitude === null) {
      setNearbyDogSpots([]);
      setDogSpotFetchStatus("idle");
      return;
    }

    fetchNearbyDogSpots(latitude, longitude);
  }, [latitude, longitude, lang]);

  useEffect(() => {
    async function fetchNearbyVets(currentLatitude: number, currentLongitude: number) {
      setIsLoadingVets(true);
      setVetFetchStatus("loading");

      try {
        const query = `
          [out:json][timeout:18];
          (
            node["amenity"="veterinary"](around:20000,${currentLatitude},${currentLongitude});
            way["amenity"="veterinary"](around:20000,${currentLatitude},${currentLongitude});
            relation["amenity"="veterinary"](around:20000,${currentLatitude},${currentLongitude});
          );
          out center tags;
        `;

        const elements = await fetchOverpassElements(query);

        const clinics = elements
          .map((item: any) => normalizeVetClinic(item, currentLatitude, currentLongitude, lang))
          .filter((item: VetClinic | null): item is VetClinic => Boolean(item))
          .filter((clinic: VetClinic) => clinic.serviceLabel.includes("24"))
          .sort((a: VetClinic, b: VetClinic) => a.distanceKm - b.distanceKm)
          .slice(0, 8);

        setNearbyVets(clinics);
        setVetFetchStatus(clinics.length > 0 ? "success" : "empty");
      } catch (error) {
        console.error(error);
        setNearbyVets([]);
        setVetFetchStatus("error");
      } finally {
        setIsLoadingVets(false);
      }
    }

    if (latitude === null || longitude === null) {
      setNearbyVets([]);
      setVetFetchStatus("idle");
      return;
    }

    fetchNearbyVets(latitude, longitude);
  }, [latitude, longitude, lang]);

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

  function persistDogProfiles(
    nextProfiles: DogProfile[],
    nextActiveDogId: string | null
  ) {
    setDogProfiles(nextProfiles);
    localStorage.setItem("wanpo-dog-profiles", JSON.stringify(nextProfiles));

    if (nextActiveDogId) {
      setActiveDogId(nextActiveDogId);
      localStorage.setItem("wanpo-active-dog-id", nextActiveDogId);
    } else {
      setActiveDogId(null);
      localStorage.removeItem("wanpo-active-dog-id");
    }
  }

  function resetDogInputForm() {
    setDogNameInput("");
    setBreedInput("shiba");
    setBirthdayInput("");
    setWeightInput("");
    setSexInput("unknown");
    setNeuteredInput("unknown");
    setAllergyInput("");
    setMedicalNoteInput("");
    setRabiesLastInput("");
    setRabiesNextInput("");
    setComboLastInput("");
    setComboNextInput("");
    setOtherVaccineNameInput("");
    setOtherVaccineLastInput("");
    setOtherVaccineNextInput("");
    setHeartwormMedicineInput("");
    setHeartwormLastInput("");
    setHeartwormNextInput("");
    setFleaTickMedicineInput("");
    setFleaTickLastInput("");
    setFleaTickNextInput("");
    setReminderEnabledInput(true);
  }

  function saveDogProfile() {
    const trimmedName = dogNameInput.trim();

    if (!trimmedName) {
      alert(t.needName);
      return;
    }

    if (dogProfiles.length >= 5 && isAddingDog) {
      alert(
        lang === "ko"
          ? "강아지는 최대 5마리까지 저장할 수 있어요."
          : "ワンちゃんは最大5匹まで保存できます。"
      );
      return;
    }

    const profile: DogProfile = {
      id: createDogId(),
      name: trimmedName,
      breed: breedInput,
      birthday: "",
      weight: "",
      sex: "unknown",
      neutered: "unknown",
      allergies: "",
      medicalNotes: "",
      vaccination: {},
      medication: {},
    };

    const nextProfiles = [...dogProfiles, profile].slice(0, 5);

    persistDogProfiles(nextProfiles, profile.id);
    setDogProfile(profile);
    setIsAddingDog(false);
    setIsHealthEditorOpen(false);
    resetDogInputForm();
  }

  function startAddDog() {
    if (dogProfiles.length >= 5) {
      alert(
        lang === "ko"
          ? "강아지는 최대 5마리까지 저장할 수 있어요."
          : "ワンちゃんは最大5匹まで保存できます。"
      );
      return;
    }

    resetDogInputForm();
    setIsHealthEditorOpen(false);
    setIsAddingDog(true);
  }

  function cancelAddDog() {
    const activeProfile =
      dogProfiles.find((item) => item.id === activeDogId) ?? dogProfiles[0] ?? null;

    setDogProfile(activeProfile);
    setIsAddingDog(false);
    resetDogInputForm();
  }

  function selectDog(profileId: string) {
    const selectedProfile = dogProfiles.find((item) => item.id === profileId);

    if (!selectedProfile) return;

    setDogProfile(selectedProfile);
    setActiveDogId(profileId);
    localStorage.setItem("wanpo-active-dog-id", profileId);
    setIsHealthEditorOpen(false);
  }

  function openHealthEditor() {
    if (!dogProfile) return;

    setDogNameInput(dogProfile.name);
    setBreedInput(dogProfile.breed);
    setBirthdayInput(dogProfile.birthday ?? "");
    setWeightInput(dogProfile.weight ?? "");
    setSexInput(dogProfile.sex ?? "unknown");
    setNeuteredInput(dogProfile.neutered ?? "unknown");
    setAllergyInput(dogProfile.allergies ?? "");
    setMedicalNoteInput(dogProfile.medicalNotes ?? "");

    setRabiesLastInput(dogProfile.vaccination?.rabiesLastDate ?? "");
    setRabiesNextInput(dogProfile.vaccination?.rabiesNextDate ?? "");
    setComboLastInput(dogProfile.vaccination?.comboLastDate ?? "");
    setComboNextInput(dogProfile.vaccination?.comboNextDate ?? "");
    setOtherVaccineNameInput(dogProfile.vaccination?.otherVaccineName ?? "");
    setOtherVaccineLastInput(dogProfile.vaccination?.otherLastDate ?? "");
    setOtherVaccineNextInput(dogProfile.vaccination?.otherNextDate ?? "");

    setHeartwormMedicineInput(
      dogProfile.medication?.heartwormMedicineName ?? ""
    );
    setHeartwormLastInput(dogProfile.medication?.heartwormLastDate ?? "");
    setHeartwormNextInput(dogProfile.medication?.heartwormNextDate ?? "");
    setFleaTickMedicineInput(dogProfile.medication?.fleaTickMedicineName ?? "");
    setFleaTickLastInput(dogProfile.medication?.fleaTickLastDate ?? "");
    setFleaTickNextInput(dogProfile.medication?.fleaTickNextDate ?? "");
    setReminderEnabledInput(dogProfile.medication?.reminderEnabled ?? true);

    setIsHealthEditorOpen(true);
  }

  function saveHealthProfile() {
    if (!dogProfile) return;

    const trimmedName = dogNameInput.trim();

    if (!trimmedName) {
      alert(t.needName);
      return;
    }

    const updatedProfile: DogProfile = {
      ...dogProfile,
      name: trimmedName,
      breed: breedInput,
      birthday: birthdayInput,
      weight: weightInput.trim(),
      sex: sexInput,
      neutered: neuteredInput,
      allergies: allergyInput.trim(),
      medicalNotes: medicalNoteInput.trim(),
      vaccination: {
        rabiesLastDate: rabiesLastInput,
        rabiesNextDate: rabiesNextInput,
        comboLastDate: comboLastInput,
        comboNextDate: comboNextInput,
        otherVaccineName: otherVaccineNameInput.trim(),
        otherLastDate: otherVaccineLastInput,
        otherNextDate: otherVaccineNextInput,
      },
      medication: {
        heartwormMedicineName: heartwormMedicineInput.trim(),
        heartwormLastDate: heartwormLastInput,
        heartwormNextDate: heartwormNextInput,
        fleaTickMedicineName: fleaTickMedicineInput.trim(),
        fleaTickLastDate: fleaTickLastInput,
        fleaTickNextDate: fleaTickNextInput,
        reminderEnabled: reminderEnabledInput,
      },
    };

    const nextProfiles = dogProfiles.map((item) =>
      item.id === updatedProfile.id ? updatedProfile : item
    );

    persistDogProfiles(nextProfiles, updatedProfile.id);
    setDogProfile(updatedProfile);
    setIsHealthEditorOpen(false);
  }

  function deleteActiveDog() {
    if (!dogProfile) return;

    const shouldDelete = window.confirm(
      lang === "ko"
        ? `${dogProfile.name} 정보를 삭제할까요?`
        : `${dogProfile.name}の情報を削除しますか？`
    );

    if (!shouldDelete) return;

    const nextProfiles = dogProfiles.filter((item) => item.id !== dogProfile.id);
    const nextActiveProfile = nextProfiles[0] ?? null;

    persistDogProfiles(nextProfiles, nextActiveProfile?.id ?? null);
    setDogProfile(nextActiveProfile);
    setIsHealthEditorOpen(false);
    resetDogInputForm();
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

  function openFavoriteVetEditor() {
    setFavoriteVetNameInput(favoriteVet.name);
    setFavoriteVetPhoneInput(favoriteVet.phone);
    setFavoriteVetAddressInput(favoriteVet.address);
    setFavoriteVetHoursInput(favoriteVet.openingHours);
    setFavoriteVetMemoInput(favoriteVet.memo);
    setIsFavoriteVetEditorOpen(true);
  }

  function saveFavoriteVet() {
    const nextFavoriteVet: FavoriteVet = {
      name: favoriteVetNameInput.trim(),
      phone: favoriteVetPhoneInput.trim(),
      address: favoriteVetAddressInput.trim(),
      openingHours: favoriteVetHoursInput.trim(),
      memo: favoriteVetMemoInput.trim(),
    };

    setFavoriteVet(nextFavoriteVet);
    localStorage.setItem("wanpo-favorite-vet", JSON.stringify(nextFavoriteVet));
    setIsFavoriteVetEditorOpen(false);
  }

  function clearFavoriteVet() {
    const shouldClear = window.confirm(
      lang === "ko"
        ? "자주 가는 병원 정보를 삭제할까요?"
        : "かかりつけ病院の情報を削除しますか？"
    );

    if (!shouldClear) return;

    const emptyFavoriteVet = {
      name: "",
      phone: "",
      address: "",
      openingHours: "",
      memo: "",
    };

    setFavoriteVet(emptyFavoriteVet);
    localStorage.removeItem("wanpo-favorite-vet");
    setIsFavoriteVetEditorOpen(false);
  }

  const hasFavoriteVet = Boolean(
    favoriteVet.name || favoriteVet.phone || favoriteVet.address || favoriteVet.openingHours || favoriteVet.memo
  );
  const favoriteVetPhoneUrl = favoriteVet.phone
    ? `tel:${favoriteVet.phone.replace(/[^+\d]/g, "")}`
    : null;
  const favoriteVetMapUrl = favoriteVet.address || favoriteVet.name
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${favoriteVet.name} ${favoriteVet.address}`)}`
    : null;
  const favoriteVetDirectionsUrl = favoriteVet.address || favoriteVet.name
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${favoriteVet.name} ${favoriteVet.address}`)}`
    : null;

  if (!dogProfile || isAddingDog) {
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
              <h1 className="mt-2 text-4xl font-black">
                {isAddingDog
                  ? lang === "ko"
                    ? "강아지 추가하기"
                    : "ワンちゃんを追加"
                  : t.setupTitle}
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {isAddingDog
                  ? lang === "ko"
                    ? "이름과 견종만 먼저 저장하고, 자세한 건강 정보는 앱 안에서 추가할 수 있어요."
                    : "名前と犬種だけ先に保存して、詳しい健康情報はアプリ内で追加できます。"
                  : lang === "ko"
                    ? "이름과 견종만 먼저 등록해도 바로 시작할 수 있어요."
                    : "名前と犬種だけ登録すれば、すぐに始められます。"}
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


            <div className="relative z-10 mt-5 rounded-3xl bg-blue-50 p-4 text-sm leading-6 text-slate-600">
              <p className="font-black text-slate-700">
                {lang === "ko" ? "나머지 정보는 나중에 입력" : "詳しい情報はあとで入力"}
              </p>
              <p className="mt-1">
                {lang === "ko"
                  ? "생일, 체중, 예방접종, 심장사상충약, 벼룩·진드기약 기록은 앱 안의 ‘건강 정보 관리’에서 추가할 수 있어요."
                  : "誕生日、体重、ワクチン、フィラリア薬、ノミ・ダニ薬の記録はアプリ内の「健康情報管理」から追加できます。"}
              </p>
            </div>
            <button
              type="button"
              onClick={saveDogProfile}
              className="relative z-20 mt-7 w-full rounded-2xl bg-blue-500 px-4 py-4 text-lg font-black text-white shadow-lg"
            >
              {isAddingDog
                ? lang === "ko"
                  ? "추가하기"
                  : "追加する"
                : t.start}
            </button>

            {isAddingDog && dogProfiles.length > 0 && (
              <button
                type="button"
                onClick={cancelAddDog}
                className="relative z-20 mt-3 w-full rounded-2xl bg-slate-100 px-4 py-4 text-base font-black text-slate-700 shadow"
              >
                {lang === "ko" ? "돌아가기" : "戻る"}
              </button>
            )}
          </section>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`h-[100svh] max-h-[100svh] overflow-hidden bg-gradient-to-b ${activeBreed.bg} p-3 text-slate-900`}
    >
      <div className="mx-auto flex h-full max-h-full max-w-md flex-col overflow-hidden">
        <section
          className="relative min-h-0 flex-1 overflow-hidden rounded-3xl bg-white/85 p-3 shadow-2xl backdrop-blur"
          onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
          onTouchEnd={(event) => {
            if (touchStartX === null) return;
            const diffX = touchStartX - event.changedTouches[0].clientX;
            if (Math.abs(diffX) > 55) {
              setActivePage((currentPage) => {
                if (diffX > 0) return Math.min(currentPage + 1, 5);
                return Math.max(currentPage - 1, 0);
              });
            }
            setTouchStartX(null);
          }}
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/40 opacity-40" />

          <div className="relative z-20 mb-2 flex h-12 shrink-0 items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs font-semibold leading-4 text-blue-500">{t.appName}</p>
              <h1 className="truncate text-2xl font-black leading-7">{t.title}</h1>
            </div>

            <button
              type="button"
              onClick={toggleLanguage}
              className="shrink-0 rounded-full bg-slate-900 px-3 py-2 text-xs font-bold text-white"
            >
              {t.languageButton}
            </button>
          </div>

          <div className="relative z-10 h-[calc(100%-3.5rem)] overflow-hidden">
            {activePage === 0 && (
              <div className="flex h-full min-h-0 flex-col gap-2 overflow-y-auto overscroll-contain pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="shrink-0 rounded-3xl bg-white p-3 shadow">
                  <div className="flex items-center gap-3">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-white shadow-inner">
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

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs leading-4 text-slate-500">
                        {lang === "ko"
                          ? `${breedData[dogProfile.breed].labelKo} · ${t.todayCheck}`
                          : `${breedData[dogProfile.breed].labelJa} · ${t.todayCheck}`}
                      </p>
                      <p className="mt-1 truncate text-base font-black leading-6">
                        {dogProfile.name}
                        {t.nowWalkQuestion}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 rounded-2xl bg-white p-3 shadow">
                  <p className="text-xs font-bold text-slate-700">{t.locationWeather}</p>
                  <p className="mt-1 truncate text-xs text-slate-500">{locationText}</p>
                  <p className="mt-1 truncate text-xs text-slate-500">{weatherStatusText}</p>
                  {isLoadingWeather && (
                    <p className="mt-1 text-xs font-semibold text-blue-500">{t.loading}</p>
                  )}
                </div>

                <div className="shrink-0 rounded-3xl bg-blue-50 p-4 shadow-inner">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-500">{t.currentTemp}</p>
                      <div className="mt-1 flex items-end gap-1">
                        <span className="text-6xl font-black leading-none tracking-tight">{airTemperature}</span>
                        <span className="mb-2 text-xl font-semibold">℃</span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 text-right">
                      <p className="text-xs text-slate-500">{t.groundTemp}</p>
                      <div className={`mt-1 inline-flex items-end justify-end gap-1 ${groundTemperatureDisplayClass}`}>
                        <span className="text-6xl font-black leading-none tracking-tight">{groundTemperature}</span>
                        <span className="mb-2 text-xl font-semibold">℃</span>
                      </div>
                    </div>
                  </div>

                  {weather && (
                    <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-[10px] leading-3 text-slate-600">
                      <div className="rounded-xl bg-white px-1 py-1.5">
                        <p className="font-bold">{t.wind}</p>
                        <p>{weather.windSpeed} km/h</p>
                      </div>
                      <div className="rounded-xl bg-white px-1 py-1.5">
                        <p className="font-bold">{t.cloud}</p>
                        <p>{weather.cloudCover}%</p>
                      </div>
                      <div className="rounded-xl bg-white px-1 py-1.5">
                        <p className="font-bold">{t.radiation}</p>
                        <p>{weather.radiation} W/m²</p>
                      </div>
                      <div className="rounded-xl bg-white px-1 py-1.5">
                        <p className="font-bold">{t.uvIndex}</p>
                        <p className="truncate">
                          {weather.uvIndex !== undefined
                            ? `${weather.uvIndex} · ${getUvLabel(weather.uvIndex, lang)}`
                            : "-"}
                        </p>
                      </div>
                      <div className="rounded-xl bg-white px-1 py-1.5">
                        <p className="font-bold">{t.airQuality}</p>
                        <p className="truncate">
                          {weather.airQualityIndex !== undefined
                            ? getAirQualityLabel(weather.airQualityIndex, lang)
                            : "-"}
                        </p>
                      </div>
                      <div className="rounded-xl bg-white px-1 py-1.5">
                        <p className="font-bold">{t.pm25}</p>
                        <p className="truncate">
                          {weather.pm25 !== undefined
                            ? `${weather.pm25} · ${getPm25Label(weather.pm25, lang)}`
                            : "-"}
                        </p>
                      </div>
                    </div>
                  )}

                  <p className="mt-2 truncate text-xs text-slate-500">
                    {lang === "ko" ? currentSurface.labelKo : currentSurface.labelJa} · {lang === "ko" ? currentSun.labelKo : currentSun.labelJa}
                  </p>
                  <p className={`mt-3 rounded-full px-4 py-3 text-center text-base font-black shadow-sm ${risk.className}`}>
                    {risk.label}
                  </p>

                  <div className={`mt-2 rounded-2xl px-3 py-2 text-xs leading-4 ${heatStress.className}`}>
                    <p className="font-black">{heatStress.label}</p>
                    <p className="mt-0.5 font-semibold">{heatStress.detail}</p>
                  </div>
                </div>

                <div className="grid shrink-0 grid-cols-2 gap-2">
                  <div>
                    <p className="mb-1 text-xs font-bold text-slate-600">{t.surface}</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {Object.entries(surfaceData).map(([key, surface]) => {
                        const isSelected = selectedSurface === key;

                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setSelectedSurface(key as SurfaceType)}
                            className={`rounded-2xl px-2 py-2 text-xs font-bold shadow ${
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

                  <div>
                    <p className="mb-1 text-xs font-bold text-slate-600">{t.sun}</p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {Object.entries(sunData).map(([key, sun]) => {
                        const isSelected = selectedSun === key;

                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setSelectedSun(key as SunType)}
                            className={`rounded-2xl px-2 py-1.5 text-xs font-bold shadow ${
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
                </div>

                <div className="shrink-0 overflow-hidden rounded-3xl bg-amber-50 px-3 py-2.5 shadow-inner">
                  <p className="text-xs font-bold text-amber-700">{t.recommendedTime}</p>
                  <p className="mt-1 truncate text-base font-black">{recommendedWalkTime.label}</p>
                  <p className="mt-0.5 line-clamp-1 text-xs leading-4 text-slate-600">
                    {recommendedWalkTime.detail}
                  </p>

                  {previewHours.length > 0 && (
                    <div className="mt-1.5 grid grid-cols-3 gap-1.5 text-center text-[10px] leading-3">
                      {previewHours.slice(0, 6).map((item) => (
                        <div key={item.time} className="rounded-xl bg-white px-1.5 py-1">
                          <p className="font-bold text-slate-700">{item.time}</p>
                          <p className="text-slate-500">{item.groundTemp}℃</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activePage === 1 && (
              <div className="flex h-full min-h-0 flex-col gap-2 overflow-y-auto overscroll-contain pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {!isHealthEditorOpen ? (
                  <>
                    <div className="shrink-0 rounded-3xl bg-white p-3 shadow">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <p className="text-sm font-black text-slate-700">
                          {lang === "ko" ? "등록된 강아지" : "登録済みのワンちゃん"}
                        </p>
                        <p className="text-xs font-bold text-slate-400">{dogProfiles.length}/5</p>
                      </div>

                      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {dogProfiles.map((profile) => {
                          const isSelected = dogProfile.id === profile.id;

                          return (
                            <button
                              key={profile.id}
                              type="button"
                              onClick={() => selectDog(profile.id)}
                              className={`flex shrink-0 items-center gap-2 rounded-2xl px-3 py-2 text-xs font-black shadow ${
                                isSelected
                                  ? "bg-slate-900 text-white"
                                  : "bg-slate-50 text-slate-700"
                              }`}
                            >
                              <img
                                src={breedData[profile.breed].image}
                                alt={profile.name}
                                className="h-8 w-8 rounded-full bg-white object-contain p-1"
                              />
                              {profile.name}
                            </button>
                          );
                        })}

                        {dogProfiles.length < 5 && (
                          <button
                            type="button"
                            onClick={startAddDog}
                            className="shrink-0 rounded-2xl bg-blue-500 px-4 py-2 text-xs font-black text-white shadow"
                          >
                            {lang === "ko" ? "+ 추가" : "+ 追加"}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 overflow-visible rounded-3xl bg-white p-3 shadow">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-black text-slate-700">
                            {lang === "ko" ? "건강 정보 관리" : "健康情報管理"}
                          </p>
                          <p className="mt-1 truncate text-xs text-slate-500">
                            {lang === "ko"
                              ? "기본 정보와 투약·접종 기록"
                              : "基本情報と投薬・ワクチン記録"}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={openHealthEditor}
                          className="shrink-0 rounded-full bg-blue-500 px-4 py-2 text-xs font-black text-white"
                        >
                          {lang === "ko" ? "수정" : "編集"}
                        </button>
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-white shadow-inner">
                          <img
                            src={breedData[dogProfile.breed].image}
                            alt={dogProfile.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs leading-4 text-slate-500">
                            {lang === "ko"
                              ? `${breedData[dogProfile.breed].labelKo} · ${t.todayCheck}`
                              : `${breedData[dogProfile.breed].labelJa} · ${t.todayCheck}`}
                          </p>
                          <p className="mt-1 truncate text-base font-black leading-6">
                            {dogProfile.name}
                            {t.nowWalkQuestion}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                        <div className="rounded-2xl bg-slate-50 p-3">
                          <p className="font-bold text-slate-400">{lang === "ko" ? "나이" : "年齢"}</p>
                          <p className="mt-1 font-black text-slate-700">{calculateDogAge(dogProfile.birthday, lang)}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-3">
                          <p className="font-bold text-slate-400">{lang === "ko" ? "체중" : "体重"}</p>
                          <p className="mt-1 font-black text-slate-700">
                            {dogProfile.weight ? `${dogProfile.weight} kg` : getEmptyText(lang)}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-3">
                          <p className="font-bold text-slate-400">{lang === "ko" ? "성별" : "性別"}</p>
                          <p className="mt-1 font-black text-slate-700">{getSexLabel(dogProfile.sex, lang)}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-3">
                          <p className="font-bold text-slate-400">{lang === "ko" ? "중성화" : "避妊・去勢"}</p>
                          <p className="mt-1 font-black text-slate-700">{getNeuteredLabel(dogProfile.neutered, lang)}</p>
                        </div>
                      </div>

                      <div className="mt-3 rounded-2xl bg-blue-50 p-3 text-xs leading-5 text-slate-700">
                        <p className="font-black text-blue-700">
                          {lang === "ko" ? "건강 기록 요약" : "健康記録のまとめ"}
                        </p>
                        <div className="mt-2 grid grid-cols-1 gap-2">
                          {[
                            {
                              label: lang === "ko" ? "광견병 다음 접종" : "狂犬病 次回",
                              date: dogProfile.vaccination?.rabiesNextDate,
                            },
                            {
                              label: lang === "ko" ? "혼합백신 다음 접종" : "混合ワクチン 次回",
                              date: dogProfile.vaccination?.comboNextDate,
                            },
                            {
                              label: lang === "ko" ? "심장사상충약 다음" : "フィラリア薬 次回",
                              date: dogProfile.medication?.heartwormNextDate,
                            },
                            {
                              label: lang === "ko" ? "벼룩, 진드기약 다음" : "ノミ・ダニ薬 次回",
                              date: dogProfile.medication?.fleaTickNextDate,
                            },
                          ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between gap-2 rounded-xl bg-white px-3 py-1.5">
                              <span className="truncate font-bold">{item.label}</span>
                              <span className={`shrink-0 rounded-full px-2 py-1 font-black ${getScheduleStatus(item.date, lang).className}`}>
                                {formatSavedDate(item.date, lang)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 rounded-2xl bg-emerald-50 p-3 text-xs leading-5 text-slate-700">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-black text-emerald-700">
                            {lang === "ko" ? "자주 가는 병원" : "かかりつけ病院"}
                          </p>
                          <button
                            type="button"
                            onClick={openFavoriteVetEditor}
                            className="shrink-0 rounded-full bg-emerald-500 px-3 py-1.5 text-[11px] font-black text-white"
                          >
                            {hasFavoriteVet
                              ? lang === "ko"
                                ? "수정"
                                : "編集"
                              : lang === "ko"
                                ? "등록"
                                : "登録"}
                          </button>
                        </div>

                        {hasFavoriteVet ? (
                          <div className="mt-2 rounded-2xl bg-white p-3">
                            <p className="text-sm font-black text-slate-700">
                              {favoriteVet.name || (lang === "ko" ? "병원명 미입력" : "病院名未入力")}
                            </p>
                            <p className="mt-1 text-xs text-slate-600">
                              <span className="font-bold">{lang === "ko" ? "전화" : "電話"}: </span>
                              {favoriteVet.phone || (lang === "ko" ? "미입력" : "未入力")}
                            </p>
                            <p className="mt-1 line-clamp-1 text-xs text-slate-600">
                              <span className="font-bold">{lang === "ko" ? "주소" : "住所"}: </span>
                              {favoriteVet.address || (lang === "ko" ? "미입력" : "未入力")}
                            </p>
                            <p className="mt-1 line-clamp-1 text-xs text-slate-600">
                              <span className="font-bold">{lang === "ko" ? "영업시간" : "診療時間"}: </span>
                              {favoriteVet.openingHours || (lang === "ko" ? "미입력" : "未入力")}
                            </p>

                            <div className="mt-2 grid grid-cols-3 gap-2">
                              <a
                                href={favoriteVetPhoneUrl || undefined}
                                className={`rounded-2xl px-2 py-2 text-center text-xs font-black text-white shadow ${favoriteVetPhoneUrl ? "bg-emerald-500" : "bg-slate-300 pointer-events-none"}`}
                              >
                                {lang === "ko" ? "전화" : "電話"}
                              </a>
                              <a
                                href={favoriteVetMapUrl || undefined}
                                target="_blank"
                                rel="noreferrer"
                                className={`rounded-2xl px-2 py-2 text-center text-xs font-black text-white shadow ${favoriteVetMapUrl ? "bg-slate-900" : "bg-slate-300 pointer-events-none"}`}
                              >
                                {lang === "ko" ? "지도" : "地図"}
                              </a>
                              <a
                                href={favoriteVetDirectionsUrl || undefined}
                                target="_blank"
                                rel="noreferrer"
                                className={`rounded-2xl px-2 py-2 text-center text-xs font-black text-white shadow ${favoriteVetDirectionsUrl ? "bg-blue-500" : "bg-slate-300 pointer-events-none"}`}
                              >
                                {lang === "ko" ? "길찾기" : "経路"}
                              </a>
                            </div>
                          </div>
                        ) : (
                          <p className="mt-2 rounded-2xl bg-white px-3 py-2 text-slate-500">
                            {lang === "ko"
                              ? "자주 가는 병원을 등록해두면 응급 상황에서 바로 전화하거나 길찾기를 열 수 있어요."
                              : "かかりつけ病院を登録しておくと、緊急時にすぐ電話・経路確認ができます。"}
                          </p>
                        )}
                      </div>
                    </div>

                    {isFavoriteVetEditorOpen && (
                      <div className="shrink-0 rounded-3xl bg-white p-3 shadow">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-black text-slate-700">
                              {lang === "ko" ? "자주 가는 병원 등록" : "かかりつけ病院を登録"}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {lang === "ko" ? "병원명, 전화번호, 주소를 저장해둘 수 있어요." : "病院名、電話番号、住所を保存できます。"}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsFavoriteVetEditorOpen(false)}
                            className="rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-600"
                          >
                            {lang === "ko" ? "닫기" : "閉じる"}
                          </button>
                        </div>

                        <div className="mt-3 grid grid-cols-1 gap-2 text-xs font-bold text-slate-700">
                          <input
                            value={favoriteVetNameInput}
                            onChange={(e) => setFavoriteVetNameInput(e.target.value)}
                            placeholder={lang === "ko" ? "병원명" : "病院名"}
                            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 outline-none focus:border-emerald-400"
                          />
                          <input
                            value={favoriteVetPhoneInput}
                            onChange={(e) => setFavoriteVetPhoneInput(e.target.value)}
                            placeholder={lang === "ko" ? "전화번호" : "電話番号"}
                            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 outline-none focus:border-emerald-400"
                          />
                          <input
                            value={favoriteVetAddressInput}
                            onChange={(e) => setFavoriteVetAddressInput(e.target.value)}
                            placeholder={lang === "ko" ? "주소" : "住所"}
                            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 outline-none focus:border-emerald-400"
                          />
                          <input
                            value={favoriteVetHoursInput}
                            onChange={(e) => setFavoriteVetHoursInput(e.target.value)}
                            placeholder={lang === "ko" ? "영업시간 / 야간 대응 메모" : "診療時間・夜間対応メモ"}
                            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 outline-none focus:border-emerald-400"
                          />
                          <input
                            value={favoriteVetMemoInput}
                            onChange={(e) => setFavoriteVetMemoInput(e.target.value)}
                            placeholder={lang === "ko" ? "메모" : "メモ"}
                            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 outline-none focus:border-emerald-400"
                          />
                        </div>

                        <div className="mt-3 grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={saveFavoriteVet}
                            className="rounded-2xl bg-emerald-500 px-3 py-2 text-xs font-black text-white shadow"
                          >
                            {lang === "ko" ? "저장" : "保存"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsFavoriteVetEditorOpen(false)}
                            className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-700 shadow"
                          >
                            {lang === "ko" ? "취소" : "キャンセル"}
                          </button>
                          <button
                            type="button"
                            onClick={clearFavoriteVet}
                            className="rounded-2xl bg-red-50 px-3 py-2 text-xs font-black text-red-600 shadow"
                          >
                            {lang === "ko" ? "삭제" : "削除"}
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-3xl bg-white shadow">
                    <div className="shrink-0 border-b border-slate-100 p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-black text-slate-700">
                            {lang === "ko" ? "강아지 건강 정보 수정" : "健康情報を編集"}
                          </p>
                          <p className="mt-1 truncate text-xs text-slate-500">
                            {lang === "ko" ? "이 화면 안에서만 스크롤됩니다." : "この枠内だけスクロールします。"}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsHealthEditorOpen(false)}
                          className="shrink-0 rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-600"
                        >
                          {lang === "ko" ? "닫기" : "閉じる"}
                        </button>
                      </div>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto p-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      <div className="space-y-3">
                        <div className="rounded-3xl bg-slate-50 p-3">
                          <p className="mb-3 text-sm font-black text-slate-700">
                            {lang === "ko" ? "강아지 개인 정보" : "ワンちゃん基本情報"}
                          </p>
                          <div className="space-y-3">
                            <label className="block text-sm font-bold text-slate-700">
                              {t.dogName}
                              <input
                                value={dogNameInput}
                                onChange={(e) => setDogNameInput(e.target.value)}
                                placeholder={t.dogNamePlaceholder}
                                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-bold outline-none focus:border-blue-400"
                              />
                            </label>

                            <div>
                              <p className="mb-1 text-sm font-bold text-slate-700">{t.breed}</p>
                              <select
                                value={breedInput}
                                onChange={(e) => setBreedInput(e.target.value as BreedType)}
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-bold outline-none focus:border-blue-400"
                              >
                                {Object.entries(breedData).map(([key, breed]) => (
                                  <option key={key} value={key}>
                                    {lang === "ko" ? breed.labelKo : breed.labelJa}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <label className="block text-sm font-bold text-slate-700">
                              {lang === "ko" ? "생일" : "誕生日"}
                              <input
                                type="date"
                                value={birthdayInput}
                                onChange={(e) => setBirthdayInput(e.target.value)}
                                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-bold outline-none focus:border-blue-400"
                              />
                            </label>

                            <label className="block text-sm font-bold text-slate-700">
                              {lang === "ko" ? "체중 kg" : "体重 kg"}
                              <input
                                type="number"
                                inputMode="decimal"
                                value={weightInput}
                                onChange={(e) => setWeightInput(e.target.value)}
                                placeholder={lang === "ko" ? "예: 5.2" : "例：5.2"}
                                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-bold outline-none focus:border-blue-400"
                              />
                            </label>

                            <div className="grid grid-cols-3 gap-2">
                              {[
                                { value: "unknown", ko: "미입력", ja: "未入力" },
                                { value: "male", ko: "남아", ja: "男の子" },
                                { value: "female", ko: "여아", ja: "女の子" },
                              ].map((item) => (
                                <button
                                  key={item.value}
                                  type="button"
                                  onClick={() => setSexInput(item.value as DogSex)}
                                  className={`rounded-2xl px-2 py-3 text-xs font-black shadow ${
                                    sexInput === item.value
                                      ? "bg-blue-500 text-white"
                                      : "bg-white text-slate-700"
                                  }`}
                                >
                                  {lang === "ko" ? item.ko : item.ja}
                                </button>
                              ))}
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                              {[
                                { value: "unknown", ko: "미입력", ja: "未入力" },
                                { value: "yes", ko: "완료", ja: "済み" },
                                { value: "no", ko: "미완료", ja: "未実施" },
                              ].map((item) => (
                                <button
                                  key={item.value}
                                  type="button"
                                  onClick={() => setNeuteredInput(item.value as NeuteredStatus)}
                                  className={`rounded-2xl px-2 py-3 text-xs font-black shadow ${
                                    neuteredInput === item.value
                                      ? "bg-slate-900 text-white"
                                      : "bg-white text-slate-700"
                                  }`}
                                >
                                  {lang === "ko" ? item.ko : item.ja}
                                </button>
                              ))}
                            </div>

                            <label className="block text-sm font-bold text-slate-700">
                              {lang === "ko" ? "주의 질병 / 알레르기" : "持病・アレルギー"}
                              <textarea
                                value={allergyInput}
                                onChange={(e) => setAllergyInput(e.target.value)}
                                className="mt-1 min-h-16 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold outline-none focus:border-blue-400"
                              />
                            </label>

                            <label className="block text-sm font-bold text-slate-700">
                              {lang === "ko" ? "추가 메모" : "追加メモ"}
                              <textarea
                                value={medicalNoteInput}
                                onChange={(e) => setMedicalNoteInput(e.target.value)}
                                className="mt-1 min-h-16 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold outline-none focus:border-blue-400"
                              />
                            </label>
                          </div>
                        </div>

                        <div className="rounded-3xl bg-blue-50 p-3">
                          <p className="mb-3 text-sm font-black text-slate-700">
                            {lang === "ko" ? "예방접종 기록" : "ワクチン記録"}
                          </p>
                          {[
                            {
                              title: lang === "ko" ? "광견병" : "狂犬病",
                              last: rabiesLastInput,
                              setLast: setRabiesLastInput,
                              next: rabiesNextInput,
                              setNext: setRabiesNextInput,
                            },
                            {
                              title: lang === "ko" ? "혼합백신" : "混合ワクチン",
                              last: comboLastInput,
                              setLast: setComboLastInput,
                              next: comboNextInput,
                              setNext: setComboNextInput,
                            },
                          ].map((item) => (
                            <div key={item.title} className="mb-3 rounded-2xl bg-white p-3 last:mb-0">
                              <p className="text-sm font-black text-slate-700">{item.title}</p>
                              <div className="mt-2 grid grid-cols-1 gap-2">
                                <label className="text-xs font-bold text-slate-600">
                                  {lang === "ko" ? "마지막 날짜" : "最後の日付"}
                                  <input
                                    type="date"
                                    value={item.last}
                                    onChange={(e) => item.setLast(e.target.value)}
                                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 font-bold outline-none focus:border-blue-400"
                                  />
                                </label>
                                <label className="text-xs font-bold text-slate-600">
                                  {lang === "ko" ? "다음 예정일" : "次回予定日"}
                                  <input
                                    type="date"
                                    value={item.next}
                                    onChange={(e) => item.setNext(e.target.value)}
                                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 font-bold outline-none focus:border-blue-400"
                                  />
                                </label>
                              </div>
                            </div>
                          ))}

                          <div className="rounded-2xl bg-white p-3">
                            <p className="text-sm font-black text-slate-700">
                              {lang === "ko" ? "기타 백신" : "その他ワクチン"}
                            </p>
                            <div className="mt-2 grid grid-cols-1 gap-2">
                              <input
                                value={otherVaccineNameInput}
                                onChange={(e) => setOtherVaccineNameInput(e.target.value)}
                                placeholder={lang === "ko" ? "백신 이름" : "ワクチン名"}
                                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold outline-none focus:border-blue-400"
                              />
                              <input
                                type="date"
                                value={otherVaccineLastInput}
                                onChange={(e) => setOtherVaccineLastInput(e.target.value)}
                                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold outline-none focus:border-blue-400"
                              />
                              <input
                                type="date"
                                value={otherVaccineNextInput}
                                onChange={(e) => setOtherVaccineNextInput(e.target.value)}
                                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold outline-none focus:border-blue-400"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="rounded-3xl bg-amber-50 p-3">
                          <p className="mb-3 text-sm font-black text-slate-700">
                            {lang === "ko" ? "투약 기록" : "投薬記録"}
                          </p>
                          {[
                            {
                              title: lang === "ko" ? "심장사상충약" : "フィラリア薬",
                              med: heartwormMedicineInput,
                              setMed: setHeartwormMedicineInput,
                              last: heartwormLastInput,
                              setLast: setHeartwormLastInput,
                              next: heartwormNextInput,
                              setNext: setHeartwormNextInput,
                            },
                            {
                              title: lang === "ko" ? "벼룩, 진드기약" : "ノミ・ダニ薬",
                              med: fleaTickMedicineInput,
                              setMed: setFleaTickMedicineInput,
                              last: fleaTickLastInput,
                              setLast: setFleaTickLastInput,
                              next: fleaTickNextInput,
                              setNext: setFleaTickNextInput,
                            },
                          ].map((item) => (
                            <div key={item.title} className="mb-3 rounded-2xl bg-white p-3 last:mb-0">
                              <p className="text-sm font-black text-slate-700">{item.title}</p>
                              <div className="mt-2 grid grid-cols-1 gap-2">
                                <input
                                  value={item.med}
                                  onChange={(e) => item.setMed(e.target.value)}
                                  placeholder={lang === "ko" ? "약 종류" : "薬の種類"}
                                  className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold outline-none focus:border-blue-400"
                                />
                                <input
                                  type="date"
                                  value={item.last}
                                  onChange={(e) => item.setLast(e.target.value)}
                                  className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold outline-none focus:border-blue-400"
                                />
                                <input
                                  type="date"
                                  value={item.next}
                                  onChange={(e) => item.setNext(e.target.value)}
                                  className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold outline-none focus:border-blue-400"
                                />
                              </div>
                            </div>
                          ))}

                          <label className="mt-3 flex items-center gap-3 rounded-2xl bg-white p-3 text-sm font-black text-slate-700">
                            <input
                              type="checkbox"
                              checked={reminderEnabledInput}
                              onChange={(e) => setReminderEnabledInput(e.target.checked)}
                              className="h-5 w-5"
                            />
                            {lang === "ko" ? "앱 안에서 알림 표시" : "アプリ内でお知らせ表示"}
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 grid grid-cols-2 gap-2 border-t border-slate-100 p-3">
                      <button
                        type="button"
                        onClick={saveHealthProfile}
                        className="rounded-2xl bg-blue-500 px-4 py-3 text-sm font-black text-white shadow-lg"
                      >
                        {lang === "ko" ? "저장" : "保存"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsHealthEditorOpen(false)}
                        className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-700 shadow"
                      >
                        {lang === "ko" ? "취소" : "キャンセル"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activePage === 2 && (
              <div className="flex h-full min-h-0 flex-col gap-2 overflow-y-auto overscroll-contain pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="shrink-0 rounded-3xl bg-white p-3 shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black text-slate-700">
                        {lang === "ko" ? "계절별 / 현재 유행 위험 정보" : "季節別・現在の注意情報"}
                      </p>
                      <p className="mt-1 text-xs leading-4 text-slate-500">
                        {lang === "ko"
                          ? `${currentSeasonName} 산책에서 특히 주의할 내용을 모았어요.`
                          : `${currentSeasonName}のお散歩で特に気をつけたいポイントです。`}
                      </p>
                    </div>
                    <div className="shrink-0 rounded-2xl bg-blue-50 px-3 py-2 text-center">
                      <p className="text-[10px] font-bold text-blue-500">
                        {lang === "ko" ? "현재 시즌" : "現在の季節"}
                      </p>
                      <p className="text-sm font-black text-blue-700">{currentSeasonName}</p>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 overflow-visible rounded-3xl bg-white p-3 shadow">
                  <div className="space-y-2">
                    {seasonalRiskCards.map((card) => (
                      <div key={card.title} className={`rounded-3xl p-3 ${card.cardClass}`}>
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-black text-slate-700">{card.title}</p>
                          <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-black ${card.badgeClass}`}>
                            {card.badge}
                          </span>
                        </div>
                        <ul className="mt-2 space-y-1 text-xs leading-5 text-slate-700">
                          {card.bullets.map((bullet) => (
                            <li key={bullet} className="rounded-2xl bg-white/80 px-3 py-2">
                              • {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    <div className="rounded-3xl bg-slate-50 p-3">
                      <p className="text-sm font-black text-slate-700">
                        {lang === "ko" ? "산책 후 체크" : "散歩後チェック"}
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs leading-4 text-slate-700">
                        <div className="rounded-2xl bg-white px-3 py-2">{lang === "ko" ? "발 / 발바닥" : "足・肉球"}</div>
                        <div className="rounded-2xl bg-white px-3 py-2">{lang === "ko" ? "귀 뒤 / 겨드랑이" : "耳の後ろ・わき"}</div>
                        <div className="rounded-2xl bg-white px-3 py-2">{lang === "ko" ? "배 / 꼬리 주변" : "お腹・しっぽ周り"}</div>
                        <div className="rounded-2xl bg-white px-3 py-2">{lang === "ko" ? "호흡 / 탈수" : "呼吸・脱水"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePage === 3 && (
              <div className="flex h-full min-h-0 flex-col gap-2 overflow-y-auto overscroll-contain pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="shrink-0 rounded-3xl bg-white p-3 shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black text-slate-700">
                        {lang === "ko" ? "근처 강아지 산책 장소" : "近くのワンちゃん散歩スポット"}
                      </p>
                      <p className="mt-1 text-xs leading-4 text-slate-500">
                        {lang === "ko"
                          ? "무료 지도 데이터를 바탕으로 공원, 산책로, 강변길, 녹지, 도그 파크를 보여줘요."
                          : "無料の地図データをもとに、公園・散歩道・川辺・緑地・ドッグパークを表示します。"}
                      </p>
                    </div>
                    <div className="shrink-0 rounded-2xl bg-green-50 px-3 py-2 text-center">
                      <p className="text-[10px] font-bold text-green-600">{lang === "ko" ? "근처 검색" : "周辺検索"}</p>
                      <p className="text-sm font-black text-green-700">5km</p>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 overflow-visible rounded-3xl bg-white p-3 shadow">
                  <div className="space-y-2">
                    <div className="rounded-2xl bg-green-50 px-3 py-2 text-xs leading-5 text-slate-700">
                      <p className="font-black text-green-700">{lang === "ko" ? "안내" : "ご案内"}</p>
                      <p className="mt-1">
                        {lang === "ko"
                          ? "공원과 산책로는 공개 지도 데이터 기준이라 실제 출입 가능 여부나 반려견 허용 규칙은 현장 표지판을 함께 확인해주세요."
                          : "公園や散歩道は公開地図データをもとに表示しています。実際の利用可否や犬同伴ルールは現地の案内もご確認ください。"}
                      </p>
                    </div>

                    <a
                      href={
                        latitude !== null && longitude !== null
                          ? `https://www.google.com/maps/search/${encodeURIComponent(lang === "ko" ? "근처 공원 산책로" : "近く 公園 散歩道")}/@${latitude},${longitude},14z`
                          : `https://www.google.com/maps/search/${encodeURIComponent(lang === "ko" ? "근처 공원 산책로" : "近く 公園 散歩道")}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-2xl bg-green-600 px-3 py-2 text-center text-xs font-black text-white shadow"
                    >
                      {lang === "ko" ? "Google 지도에서 산책 장소 바로 보기" : "Googleマップで散歩スポットを見る"}
                    </a>

                    {isLoadingDogSpots && (
                      <div className="rounded-3xl bg-slate-50 px-4 py-6 text-center text-sm font-bold text-slate-500">
                        {lang === "ko" ? "근처 산책 장소를 찾는 중이에요..." : "近くの散歩スポットを探しています..."}
                      </div>
                    )}

                    {!isLoadingDogSpots && dogSpotFetchStatus === "empty" && (
                      <div className="rounded-3xl bg-slate-50 px-4 py-6 text-center text-sm font-bold text-slate-500">
                        {lang === "ko"
                          ? "근처 산책 장소를 찾지 못했어요. 위치 권한이나 네트워크를 확인해주세요."
                          : "近くの散歩スポットが見つかりませんでした。位置情報または通信状況をご確認ください。"}
                      </div>
                    )}

                    {!isLoadingDogSpots && dogSpotFetchStatus === "error" && (
                      <div className="rounded-3xl bg-red-50 px-4 py-6 text-center text-sm font-bold text-red-600">
                        {lang === "ko"
                          ? "산책 장소 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요."
                          : "散歩スポット情報を取得できませんでした。しばらくしてから再度お試しください。"}
                      </div>
                    )}

                    {nearbyDogSpots.map((spot) => (
                      <div key={spot.id} className="rounded-3xl bg-slate-50 p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-black text-slate-700">{spot.name}</p>
                            <p className="mt-1 text-xs font-bold text-slate-500">
                              {lang === "ko" ? "현재 위치에서 " : "現在地から "}
                              {formatDistanceText(spot.distanceKm, lang)}
                            </p>
                          </div>
                          <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-black ${spot.kindClassName}`}>
                            {spot.kindLabel}
                          </span>
                        </div>
                        <p className="mt-2 rounded-2xl bg-white px-3 py-2 text-xs leading-5 text-slate-600">{spot.note}</p>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <a
                            href={spot.mapUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-2xl bg-slate-900 px-2 py-2 text-center text-xs font-black text-white shadow"
                          >
                            {lang === "ko" ? "지도" : "地図"}
                          </a>
                          <a
                            href={spot.directionsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-2xl bg-green-500 px-2 py-2 text-center text-xs font-black text-white shadow"
                          >
                            {lang === "ko" ? "길찾기" : "経路"}
                          </a>
                        </div>
                      </div>
                    ))}

                    <div className="rounded-3xl bg-amber-50 p-3">
                      <p className="text-sm font-black text-amber-700">
                        {lang === "ko" ? "강아지 동반 카페 / 식당 찾기" : "犬同伴カフェ・レストランを探す"}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        {lang === "ko"
                          ? "정확한 반려견 동반 가능 여부는 가게마다 달라서, 지금은 Google 검색 버튼으로 연결해드려요."
                          : "犬同伴可否は店舗ごとに異なるため、今はGoogle検索ボタンで確認できるようにしています。"}
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <a
                          href={dogCafeSearchUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-2xl bg-amber-500 px-2 py-2 text-center text-xs font-black text-white shadow"
                        >
                          {lang === "ko" ? "카페 찾기" : "カフェ検索"}
                        </a>
                        <a
                          href={dogRestaurantSearchUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-2xl bg-orange-500 px-2 py-2 text-center text-xs font-black text-white shadow"
                        >
                          {lang === "ko" ? "식당 찾기" : "レストラン検索"}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePage === 4 && (
              <div className="flex h-full min-h-0 flex-col gap-2 overflow-y-auto overscroll-contain pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="shrink-0 rounded-3xl bg-white p-3 shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black text-slate-700">
                        {lang === "ko" ? "20km 이내 24시간 동물병원 후보" : "20km以内の24時間動物病院候補"}
                      </p>
                      <p className="mt-1 text-xs leading-4 text-slate-500">
                        {lang === "ko"
                          ? "현재 위치 기준 20km 이내에서 공개 데이터에 24시간 표시가 있는 병원만 보여줘요."
                          : "現在地から20km以内で、公開データに24時間表示がある病院だけを表示します。"}
                      </p>
                    </div>
                    <div className="shrink-0 rounded-2xl bg-blue-50 px-3 py-2 text-center">
                      <p className="text-[10px] font-bold text-blue-500">{lang === "ko" ? "검색 범위" : "検索範囲"}</p>
                      <p className="text-sm font-black text-blue-700">20km</p>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 overflow-visible rounded-3xl bg-white p-3 shadow">
                  <div className="space-y-2">
                    <div className="rounded-2xl bg-blue-50 px-3 py-2 text-xs leading-5 text-slate-700">
                      <p className="font-black text-blue-700">
                        {lang === "ko" ? "안내" : "ご案内"}
                      </p>
                      <p className="mt-1">
                        {lang === "ko"
                          ? "일반 가까운 병원은 제외하고, 24시간 표시가 있는 후보만 보여줘요. 단, 공개 데이터가 틀릴 수 있으니 정보확인 버튼으로 주소·전화번호·진료시간을 반드시 확인해주세요."
                          : "通常の近い病院は除外し、24時間表示がある候補だけを表示します。ただし公開データが誤っている場合があるため、情報確認ボタンで住所・電話番号・診療時間を必ず確認してください。"}
                      </p>
                    </div>

                    <a
                      href={emergencyVetSearchUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-2xl bg-blue-600 px-3 py-2 text-center text-xs font-black text-white shadow"
                    >
                      {lang === "ko" ? "Google 지도에서 24시간 동물병원 검색" : "Googleマップで24時間動物病院を検索"}
                    </a>

                    {isLoadingVets && (
                      <div className="rounded-3xl bg-slate-50 px-4 py-6 text-center text-sm font-bold text-slate-500">
                        {lang === "ko" ? "20km 이내 24시간 동물병원 후보를 찾는 중이에요..." : "20km以内の24時間動物病院候補を探しています..."}
                      </div>
                    )}

                    {!isLoadingVets && vetFetchStatus === "empty" && (
                      <div className="rounded-3xl bg-slate-50 px-4 py-5 text-center text-sm font-bold text-slate-500">
                        <p>
                          {lang === "ko"
                            ? "공개 지도 데이터에서 20km 이내 24시간 표시 후보를 찾지 못했어요."
                            : "公開地図データでは20km以内の24時間表示候補が見つかりませんでした。"}
                        </p>
                        <a
                          href={emergencyVetSearchUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex rounded-2xl bg-amber-500 px-4 py-2 text-xs font-black text-white shadow"
                        >
                          {lang === "ko" ? "정보확인" : "情報確認"}
                        </a>
                      </div>
                    )}

                    {!isLoadingVets && vetFetchStatus === "error" && (
                      <div className="rounded-3xl bg-red-50 px-4 py-6 text-center text-sm font-bold text-red-600">
                        {lang === "ko"
                          ? "동물병원 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요."
                          : "動物病院情報を取得できませんでした。しばらくしてから再度お試しください。"}
                      </div>
                    )}

                    {nearbyVets.map((clinic) => (
                      <div key={clinic.id} className="rounded-3xl bg-slate-50 p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-black text-slate-700">{clinic.name}</p>
                            <p className="mt-1 text-xs font-bold text-slate-500">
                              {lang === "ko" ? "현재 위치에서 " : "現在地から "}
                              {formatDistanceText(clinic.distanceKm, lang)}
                            </p>
                          </div>
                          <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-black ${clinic.serviceClassName}`}>
                            {clinic.serviceLabel}
                          </span>
                        </div>

                        <div className="mt-2 space-y-1 rounded-2xl bg-white px-3 py-3 text-xs leading-5 text-slate-700">
                          <p className="text-[11px] text-slate-500">{clinic.note}</p>
                          <p className="text-[11px] text-slate-500">
                            {lang === "ko"
                              ? "주소·전화번호·진료시간은 정보확인 버튼에서 최신 페이지로 확인해주세요."
                              : "住所・電話番号・診療時間は情報確認ボタンから最新ページで確認してください。"}
                          </p>
                        </div>

                        <div className="mt-2 grid grid-cols-3 gap-2">
                          <a
                            href={clinic.phoneUrl || undefined}
                            className={`rounded-2xl px-2 py-2 text-center text-[11px] font-black text-white shadow ${clinic.phoneUrl ? "bg-emerald-500" : "bg-slate-300 pointer-events-none"}`}
                          >
                            {lang === "ko" ? "전화" : "電話"}
                          </a>
                          <a
                            href={clinic.infoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-2xl bg-amber-500 px-2 py-2 text-center text-[11px] font-black text-white shadow"
                          >
                            {lang === "ko" ? "정보확인" : "情報確認"}
                          </a>
                          <a
                            href={clinic.directionsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-2xl bg-blue-500 px-2 py-2 text-center text-[11px] font-black text-white shadow"
                          >
                            {lang === "ko" ? "길찾기" : "経路"}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activePage === 5 && (
              <div className="flex h-full min-h-0 flex-col gap-2 overflow-y-auto overscroll-contain pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="shrink-0 rounded-3xl bg-white p-3 shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black text-slate-700">{t.handTest}</p>
                      <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-slate-500">
                        {t.handTestDesc}
                      </p>
                    </div>

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-2xl font-black text-blue-600">
                      {timer}
                    </div>
                  </div>

                  {isTimerRunning && (
                    <p className="mt-2 text-center text-xs font-bold text-blue-600">{t.handTestRunning}</p>
                  )}

                  {timerFinished && (
                    <p className="mt-2 rounded-2xl bg-green-100 px-3 py-2 text-center text-xs font-bold leading-4 text-green-700">
                      {t.handTestDone}
                    </p>
                  )}

                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={startTimer}
                      disabled={isTimerRunning}
                      className="rounded-2xl bg-blue-500 px-3 py-2 text-sm font-black text-white shadow-lg disabled:bg-slate-300"
                    >
                      {t.timerStart}
                    </button>
                    <button
                      type="button"
                      onClick={resetTimer}
                      className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-black text-slate-700 shadow"
                    >
                      {t.timerReset}
                    </button>
                  </div>
                </div>

                <div className="shrink-0 rounded-3xl bg-slate-50 p-3 shadow">
                  <p className="text-sm font-black text-slate-700">{t.tempGuideTitle}</p>

                  <div className="mt-2 space-y-1 text-[11px] font-bold leading-4">
                    <div className="flex justify-between rounded-xl bg-green-100 px-3 py-1 text-green-800">
                      <span>{lang === "ko" ? "35℃ 이하" : "35℃以下"}</span>
                      <span>{lang === "ko" ? "산책 가능" : "お散歩可能"}</span>
                    </div>
                    <div className="flex justify-between rounded-xl bg-yellow-100 px-3 py-1 text-yellow-800">
                      <span>36–40℃</span>
                      <span>{lang === "ko" ? "짧게 가능" : "短めなら可能"}</span>
                    </div>
                    <div className="flex justify-between rounded-xl bg-orange-100 px-3 py-1 text-orange-800">
                      <span>41–45℃</span>
                      <span>{lang === "ko" ? "주의 필요" : "注意が必要"}</span>
                    </div>
                    <div className="flex justify-between rounded-xl bg-red-100 px-3 py-1 text-red-700">
                      <span>46–50℃</span>
                      <span>{lang === "ko" ? "위험" : "危険"}</span>
                    </div>
                    <div className="flex justify-between rounded-xl bg-zinc-200 px-3 py-1 text-zinc-800">
                      <span>{lang === "ko" ? "50℃ 이상" : "50℃以上"}</span>
                      <span>{lang === "ko" ? "산책 피하기" : "お散歩を避ける"}</span>
                    </div>
                  </div>

                  <p className="mt-2 line-clamp-2 text-[10px] leading-4 text-slate-500">
                    {t.guideSourceNote}
                  </p>
                </div>

                <div className="shrink-0 overflow-visible rounded-3xl bg-white p-3 shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black text-slate-700">{t.shareTitle}</p>
                      <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-slate-500">
                        {t.shareDescription}
                      </p>
                    </div>

                    <img
                      src={qrCodeUrl}
                      alt="QR code"
                      className="h-16 w-16 shrink-0 rounded-2xl bg-slate-50 p-1.5 shadow"
                    />
                  </div>

                  <p className="mt-2 truncate text-center text-[10px] font-bold text-blue-600">
                    {APP_URL}
                  </p>

                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={copyShareText}
                      className="rounded-2xl bg-slate-900 px-3 py-2 text-xs font-black text-white shadow"
                    >
                      {t.copyIntro}
                    </button>
                    <button
                      type="button"
                      onClick={shareApp}
                      className="rounded-2xl bg-blue-500 px-3 py-2 text-xs font-black text-white shadow"
                    >
                      {t.shareButton}
                    </button>
                  </div>

                  {copyStatus && (
                    <p className="mt-2 text-center text-xs font-bold text-blue-600">{copyStatus}</p>
                  )}

                  <details className="mt-2 rounded-2xl bg-blue-50 px-3 py-2 text-[10px] leading-4 text-slate-600">
                    <summary className="cursor-pointer font-bold text-slate-700">
                      {lang === "ko" ? "공유용 소개문 보기" : "紹介文を見る"}
                    </summary>
                    <p className="mt-1 max-h-16 overflow-y-auto whitespace-pre-line [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {getShareText(lang)}
                    </p>
                  </details>
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="mt-2 flex h-10 shrink-0 items-center justify-between gap-2 rounded-2xl bg-white/70 px-2 shadow backdrop-blur">
          <button
            type="button"
            onClick={() => setActivePage((page) => Math.max(page - 1, 0))}
            className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-black text-white disabled:bg-slate-300"
            disabled={activePage === 0}
          >
            ←
          </button>

          <div className="flex items-center gap-2">
            {[0, 1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setActivePage(page)}
                className={`h-2.5 w-2.5 rounded-full ${
                  activePage === page ? "bg-blue-500" : "bg-slate-300"
                }`}
                aria-label={`page-${page + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setActivePage((page) => Math.min(page + 1, 5))}
            className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-black text-white disabled:bg-slate-300"
            disabled={activePage === 5}
          >
            →
          </button>
        </div>
      </div>
    </main>
  );
}
