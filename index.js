
const confusableMap = new Map([
  // ===== Latin & Polish letters =====
  [0x0041, { pol: 0x0041, ukr: 0x0410, upper: true, valid: "pol" }], // A
  [0x0061, { pol: 0x0061, ukr: 0x0430, upper: false, valid: "pol" }], // a
  [0x0042, { pol: 0x0042, ukr: 0x0412, upper: true, valid: "pol" }], // B
  [0x0062, { pol: 0x0062, ukr: 0x0432, upper: false, valid: "pol" }], // b
  [0x0043, { pol: 0x0043, ukr: 0x0421, upper: true, valid: "pol" }], // C
  [0x0063, { pol: 0x0063, ukr: 0x0441, upper: false, valid: "pol" }], // c
  [0x0044, { pol: 0x0044, ukr: 0x0414, upper: true, valid: "pol" }], // D
  [0x0064, { pol: 0x0064, ukr: 0x0434, upper: false, valid: "pol" }], // d
  [0x0045, { pol: 0x0045, ukr: 0x0415, upper: true, valid: "pol" }], // E
  [0x0065, { pol: 0x0065, ukr: 0x0435, upper: false, valid: "pol" }], // e
  [0x0048, { pol: 0x0048, ukr: 0x041D, upper: true, valid: "pol" }], // H
  [0x0068, { pol: 0x0068, ukr: 0x043D, upper: false, valid: "pol" }], // h
  [0x0049, { pol: 0x0049, ukr: 0x0406, upper: true, valid: "pol" }], // I
  [0x0069, { pol: 0x0069, ukr: 0x0456, upper: false, valid: "pol" }], // i
  [0x004C, { pol: 0x004C, ukr: 0x041B, upper: true, valid: "pol" }], // L
  [0x006C, { pol: 0x006C, ukr: 0x043B, upper: false, valid: "pol" }], // l
  [0x004E, { pol: 0x004E, ukr: 0x041D, upper: true, valid: "pol" }], // N
  [0x006E, { pol: 0x006E, ukr: 0x043D, upper: false, valid: "pol" }], // n
  [0x004F, { pol: 0x004F, ukr: 0x041E, upper: true, valid: "pol" }], // O
  [0x006F, { pol: 0x006F, ukr: 0x043E, upper: false, valid: "pol" }], // o
  [0x0053, { pol: 0x0053, ukr: 0x0405, upper: true, valid: "pol" }], // S
  [0x0073, { pol: 0x0073, ukr: 0x0455, upper: false, valid: "pol" }], // s
  [0x0057, { pol: 0x0057, ukr: 0xFF37, upper: true, valid: "pol" }], // W
  [0x0077, { pol: 0x0077, ukr: 0xFF57, upper: false, valid: "pol" }], // w
  [0x005A, { pol: 0x005A, ukr: 0x0417, upper: true, valid: "pol" }], // Z
  [0x007A, { pol: 0x007A, ukr: 0x0437, upper: false, valid: "pol" }], // z

  // ===== Polish diacritics =====
  [0x0104, { pol: 0x0104, upper: true, valid: "pol" }], // Ą
  [0x0105, { pol: 0x0105, upper: false, valid: "pol" }], // ą
  [0x0106, { pol: 0x0106, upper: true, valid: "pol" }], // Ć
  [0x0107, { pol: 0x0107, upper: false, valid: "pol" }], // ć
  [0x0118, { pol: 0x0118, upper: true, valid: "pol" }], // Ę
  [0x0119, { pol: 0x0119, upper: false, valid: "pol" }], // ę
  [0x0141, { pol: 0x0141, upper: true, valid: "pol" }], // Ł
  [0x0142, { pol: 0x0142, upper: false, valid: "pol" }], // ł
  [0x0143, { pol: 0x0143, upper: true, valid: "pol" }], // Ń
  [0x0144, { pol: 0x0144, upper: false, valid: "pol" }], // ń
  [0x015A, { pol: 0x015A, upper: true, valid: "pol" }], // Ś
  [0x015B, { pol: 0x015B, upper: false, valid: "pol" }], // ś
  [0x0179, { pol: 0x0179, upper: true, valid: "pol" }], // Ź
  [0x017A, { pol: 0x017A, upper: false, valid: "pol" }], // ź
  [0x017B, { pol: 0x017B, upper: true, valid: "pol" }], // Ż
  [0x017C, { pol: 0x017C, upper: false, valid: "pol" }], // ż
  [0x00D3, { pol: 0x00D3, upper: true, valid: "pol" }], // Ó
  [0x00F3, { pol: 0x00F3, upper: false, valid: "pol" }], // ó

  // ===== Ukrainian letters =====
  [0x0410, { ukr: 0x0410, upper: true, valid: "ukr" }], // А
  [0x0430, { ukr: 0x0430, upper: false, valid: "ukr" }], // а
  [0x0412, { ukr: 0x0412, upper: true, valid: "ukr" }], // В
  [0x0432, { ukr: 0x0432, upper: false, valid: "ukr" }], // в
  [0x0421, { ukr: 0x0421, upper: true, valid: "ukr" }], // С
  [0x0441, { ukr: 0x0441, upper: false, valid: "ukr" }], // с
  [0x0414, { ukr: 0x0414, upper: true, valid: "ukr" }], // Д
  [0x0434, { ukr: 0x0434, upper: false, valid: "ukr" }], // д
  [0x0406, { ukr: 0x0406, upper: true, valid: "ukr" }], // І
  [0x0456, { ukr: 0x0456, upper: false, valid: "ukr" }], // і
  [0x0415, { ukr: 0x0415, upper: true, valid: "ukr" }], // Е
  [0x0435, { ukr: 0x0435, upper: false, valid: "ukr" }], // е
  [0x041D, { ukr: 0x041D, upper: true, valid: "ukr" }], // Н
  [0x043D, { ukr: 0x043D, upper: false, valid: "ukr" }], // н
  [0x041E, { ukr: 0x041E, upper: true, valid: "ukr" }], // О
  [0x043E, { ukr: 0x043E, upper: false, valid: "ukr" }], // о
  [0x0405, { ukr: 0x0405, upper: true, valid: "ukr" }], // Ѕ
  [0x0455, { ukr: 0x0455, upper: false, valid: "ukr" }], // ѕ
  [0x0417, { ukr: 0x0417, upper: true, valid: "ukr" }], // З
  [0x0437, { ukr: 0x0437, upper: false, valid: "ukr" }], // з
  [0x0429, { ukr: 0x0429, upper: true, valid: "ukr" }], // Щ
  [0x0449, { ukr: 0x0449, upper: false, valid: "ukr" }], // щ
  [0x042C, { ukr: 0x042C, upper: true, valid: "ukr" }], // Ь
  [0x044C, { ukr: 0x044C, upper: false, valid: "ukr" }], // ь

  // ===== Digits =====
  [0x0030, { pol: 0x0030, ukr: 0x0030, upper: false, valid: "pol" }], // 0
  [0x0031, { pol: 0x0031, ukr: 0x0031, upper: false, valid: "pol" }], // 1
  [0x0032, { pol: 0x0032, ukr: 0x0032, upper: false, valid: "pol" }], // 2
  [0x0033, { pol: 0x0033, ukr: 0x0033, upper: false, valid: "pol" }], // 3
  [0x0034, { pol: 0x0034, ukr: 0x0034, upper: false, valid: "pol" }], // 4
  [0x0035, { pol: 0x0035, ukr: 0x0035, upper: false, valid: "pol" }], // 5
  [0x0036, { pol: 0x0036, ukr: 0x0036, upper: false, valid: "pol" }], // 6
  [0x0037, { pol: 0x0037, ukr: 0x0037, upper: false, valid: "pol" }], // 7
  [0x0038, { pol: 0x0038, ukr: 0x0038, upper: false, valid: "pol" }], // 8
  [0x0039, { pol: 0x0039, ukr: 0x0039, upper: false, valid: "pol" }], // 9

  // ===== Punctuation & symbols =====
  [0x0020, " "], // space
  [0x002C, ","], // comma
  [0x002E, "."], // full stop
  [0x2014, "-"], // em dash
  [0x2015, "-"], // horizontal bar
  [0x2019, "'"], // apostrophe
  [0x0027, "'"], // apostrophe
  [0x0022, "\""], // quote


  // ===== Fullwidth Latin letters =====
  [0xFF21, { pol: 0x0041, ukr: 0x0410, upper: true, valid: "pol" }], // Ａ
  [0xFF22, { pol: 0x0042, ukr: 0x0412, upper: true, valid: "pol" }], // Ｂ
  [0xFF23, { pol: 0x0043, ukr: 0x0421, upper: true, valid: "pol" }], // Ｃ
  [0xFF24, { pol: 0x0044, ukr: 0x0414, upper: true, valid: "pol" }], // Ｄ
  [0xFF25, { pol: 0x0045, ukr: 0x0415, upper: true, valid: "pol" }], // Ｅ
  [0xFF28, { pol: 0x0048, ukr: 0x041D, upper: true, valid: "pol" }], // Ｈ
  [0xFF29, { pol: 0x0049, ukr: 0x0406, upper: true, valid: "pol" }], // Ｉ
  [0xFF2C, { pol: 0x004C, ukr: 0x041B, upper: true, valid: "pol" }], // Ｌ
  [0xFF2E, { pol: 0x004E, ukr: 0x041D, upper: true, valid: "pol" }], // Ｎ
  [0xFF2F, { pol: 0x004F, ukr: 0x041E, upper: true, valid: "pol" }], // Ｏ
  [0xFF33, { pol: 0x0053, ukr: 0x0405, upper: true, valid: "pol" }], // Ｓ
  [0xFF37, { pol: 0x0057, ukr: 0xFF37, upper: true, valid: "pol" }], // Ｗ
  [0xFF3A, { pol: 0x005A, ukr: 0x0417, upper: true, valid: "pol" }], // Ｚ

  [0xFF41, { pol: 0x0061, ukr: 0x0430, upper: false, valid: "pol" }], // ａ
  [0xFF42, { pol: 0x0062, ukr: 0x0432, upper: false, valid: "pol" }], // ｂ
  [0xFF43, { pol: 0x0063, ukr: 0x0441, upper: false, valid: "pol" }], // ｃ
  [0xFF44, { pol: 0x0064, ukr: 0x0434, upper: false, valid: "pol" }], // ｄ
  [0xFF45, { pol: 0x0065, ukr: 0x0435, upper: false, valid: "pol" }], // ｅ
  [0xFF48, { pol: 0x0068, ukr: 0x043D, upper: false, valid: "pol" }], // ｈ
  [0xFF49, { pol: 0x0069, ukr: 0x0456, upper: false, valid: "pol" }], // ｉ
  [0xFF4C, { pol: 0x006C, ukr: 0x043B, upper: false, valid: "pol" }], // ｌ
  [0xFF4E, { pol: 0x006E, ukr: 0x043D, upper: false, valid: "pol" }], // ｎ
  [0xFF4F, { pol: 0x006F, ukr: 0x043E, upper: false, valid: "pol" }], // ｏ
  [0xFF53, { pol: 0x0073, ukr: 0x0455, upper: false, valid: "pol" }], // ｓ
  [0xFF57, { pol: 0x0077, ukr: 0xFF57, upper: false, valid: "pol" }], // ｗ
  [0xFF5A, { pol: 0x007A, ukr: 0x0437, upper: false, valid: "pol" }], // ｚ

  // ===== Fullwidth digits =====
  [0xFF10, { pol: 0x0030, ukr: 0x0030, upper: false, valid: "pol" }], // ０
  [0xFF11, { pol: 0x0031, ukr: 0x0031, upper: false, valid: "pol" }], // １
  [0xFF12, { pol: 0x0032, ukr: 0x0032, upper: false, valid: "pol" }], // ２
  [0xFF13, { pol: 0x0033, ukr: 0x0033, upper: false, valid: "pol" }], // ３
  [0xFF14, { pol: 0x0034, ukr: 0x0034, upper: false, valid: "pol" }], // ４
  [0xFF15, { pol: 0x0035, ukr: 0x0035, upper: false, valid: "pol" }], // ５
  [0xFF16, { pol: 0x0036, ukr: 0x0036, upper: false, valid: "pol" }], // ６
  [0xFF17, { pol: 0x0037, ukr: 0x0037, upper: false, valid: "pol" }], // ７
  [0xFF18, { pol: 0x0038, ukr: 0x0038, upper: false, valid: "pol" }], // ８
  [0xFF19, { pol: 0x0039, ukr: 0x0039, upper: false, valid: "pol" }], // ９

  // ===== Fullwidth punctuation =====
  [0xFF0C, ","], // ，
  [0xFF0E, "."], // ．
  [0xFF1A, ":"], // ：
  [0xFF1B, ";"], // ；
  [0xFF1F, "?"], // ？
  [0xFF01, "!"], // ！
  [0x2014, "-"], // em dash
  [0x2015, "-"], // horizontal bar
  [0x2019, "'"], // ’
  [0xFF07, "'"], // ＇
  [0x0027, "'"], // '
  [0x0022, "\""], // "
  [0xFF02, "\""], // ＂
  [0x0020, " "], // space
]);


const fromCodePoint = (codePoint) => codePoint === undefined ? undefined : String.fromCodePoint(codePoint)

export const ensure = (text, lang) => Array.from(text).map(c => {
  const code = c.codePointAt(0);
  const mapped = code === undefined ? undefined : confusableMap.get(code)
  return typeof mapped === "string"
    ? mapped
    : mapped
      ? mapped.valid === lang
        ? c
        : (fromCodePoint(mapped[lang]) ?? c)
      : c
}).join("")



const isUpper = (s) => s === s.toUpperCase() && s !== s.toLowerCase();
const capitalize = (s) => s ? s[0].toUpperCase() + s.slice(1) : s;

const matchCase = (src, out) =>
  src.length === 0 ? out :
    src.length === 1 ? (isUpper(src) ? capitalize(out) : out) :
      isUpper(src[0]) ? capitalize(out) : out;

// ---------- Mapping tables ----------
const uaSingleToPl = new Map([
  ["А", "A"], ["а", "a"],
  ["Б", "B"], ["б", "b"],
  ["В", "W"], ["в", "w"],
  ["Г", "H"], ["г", "h"],
  ["Ґ", "G"], ["ґ", "g"],
  ["Д", "D"], ["д", "d"],
  ["Е", "E"], ["е", "e"],
  ["Ж", "Ż"], ["ж", "ż"],
  ["З", "Z"], ["з", "z"],
  ["И", "Y"], ["и", "y"],
  ["І", "I"], ["і", "i"],
  ["Й", "J"], ["й", "j"],
  ["К", "K"], ["к", "k"],
  ["М", "M"], ["м", "m"],
  ["Н", "N"], ["н", "n"],
  ["О", "O"], ["о", "o"],
  ["П", "P"], ["п", "p"],
  ["Р", "R"], ["р", "r"],
  ["С", "S"], ["с", "s"],
  ["Т", "T"], ["т", "t"],
  ["У", "U"], ["у", "u"],
  ["Ф", "F"], ["ф", "f"],
  ["Х", "Ch"], ["х", "ch"],
  ["Ц", "C"], ["ц", "c"],
  ["Ч", "Cz"], ["ч", "cz"],
  ["Ш", "Sz"], ["ш", "sz"]
]);

const plSingleToUa = new Map([
  ["A", "А"], ["a", "а"],
  ["B", "Б"], ["b", "б"],
  ["W", "В"], ["w", "в"],
  ["H", "Г"], ["h", "г"],
  ["G", "Ґ"], ["g", "ґ"],
  ["D", "Д"], ["d", "д"],
  ["E", "Е"], ["e", "е"],
  ["Z", "З"], ["z", "з"],
  ["Y", "И"], ["y", "и"],
  ["I", "І"], ["i", "і"],
  ["K", "К"], ["k", "к"],
  ["L", "Л"], ["l", "л"],
  ["Ł", "Л"], ["ł", "л"],
  ["M", "М"], ["m", "м"],
  ["N", "Н"], ["n", "н"],
  ["O", "О"], ["o", "о"],
  ["P", "П"], ["p", "п"],
  ["R", "Р"], ["r", "р"],
  ["S", "С"], ["s", "с"],
  ["T", "Т"], ["t", "т"],
  ["U", "У"], ["u", "у"],
  ["F", "Ф"], ["f", "ф"],
  ["C", "Ц"], ["c", "ц"],
  ["J", "Й"], ["j", "й"],
]);

// ---------- Ukrainian → Polish ----------
export const uaToPl = str =>
  str
    .replace(/Щ/g, "Szcz").replace(/щ/g, "szcz")
    .replace(/ДЗЬ/g, "DŹ").replace(/дзь/g, "dź")
    .replace(/ЦЬ/g, "Ć").replace(/ць/g, "ć")
    .replace(/ЗЬ/g, "Ź").replace(/зь/g, "ź")
    .replace(/СЬ/g, "Ś").replace(/сь/g, "ś")
    .replace(/НЬ/g, "Ń").replace(/нь/g, "ń")
    .replace(/ЛЬ/g, "L").replace(/ль/g, "l")
    .replace(/ТЬ/g, "T'").replace(/ть/g, "t´")
    .replace(/ДЬ/g, "D'").replace(/дь/g, "d´")
    .replace(/’/g, "")
    .split("")
    .map(ch => uaSingleToPl.get(ch) || ch)
    .join("");

// ---------- Polish → Ukrainian ----------
export const plToUa = str =>
  str
    .replace(/Szcz/g, "Щ").replace(/szcz/g, "щ")
    .replace(/Cz/g, "Ч").replace(/cz/g, "ч")
    .replace(/Sz/g, "Ш").replace(/sz/g, "ш")
    .replace(/Ch/g, "Х").replace(/ch/g, "х")
    .replace(/Ż/g, "Ж").replace(/ż/g, "ж")
    .replace(/Ź/g, "Зь").replace(/ź/g, "зь")
    .replace(/Ś/g, "Сь").replace(/ś/g, "сь")
    .replace(/Ć/g, "Ць").replace(/ć/g, "ць")
    .replace(/Ń/g, "Нь").replace(/ń/g, "нь")
    .replace(/DŹ/g, "ДЗЬ").replace(/dź/g, "дзь")
    .replace(/T'/g, "Ть").replace(/t'/g, "ть")
    .replace(/D'/g, "Дь").replace(/d'/g, "дь")
    .replace(/J[aA]/g, "Я").replace(/j[aA]/g, "я")
    .replace(/J[eE]/g, "Є").replace(/j[eE]/g, "є")
    .replace(/J[iI]/g, "Ї").replace(/j[iI]/g, "ї")
    .replace(/J[uU]/g, "Ю").replace(/j[uU]/g, "ю")
    .split("")
    .map(ch => plSingleToUa.get(ch) || ch)
    .join("");
