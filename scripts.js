// code: [name, lat, lon, region, ISO3, grading scale]
const C = {
    BD: ["Bangladesh", 23.8, 90.4, "Asia", "BGD", 4],
    IN: ["India", 28.6, 77.2, "Asia", "IND", 10],
    PK: ["Pakistan", 33.7, 73.1, "Asia", "PAK", 4],
    LK: ["Sri Lanka", 6.9, 79.9, "Asia", "LKA", 4],
    NP: ["Nepal", 27.7, 85.3, "Asia", "NPL", 4],
    ID: ["Indonesia", -6.2, 106.8, "Asia", "IDN", 4],
    VN: ["Vietnam", 21, 105.8, "Asia", "VNM", 4],
    PH: ["Philippines", 14.6, 121.0, "Asia", "PHL", 4],
    JP: ["Japan", 35.7, 139.7, "Asia", "JPN", 4],
    KR: ["South Korea", 37.6, 127, "Asia", "KOR", 4.5],
    CN: ["China", 39.9, 116.4, "Asia", "CHN", 4],
    TW: ["Taiwan", 25.0, 121.5, "Asia", "TWN", 4],
    HK: ["Hong Kong", 22.3, 114.2, "Asia", "HKG", 4],
    SG: ["Singapore", 1.35, 103.8, "Asia", "SGP", 5],
    MY: ["Malaysia", 3.1, 101.7, "Asia", "MYS", 4],
    TR: ["Türkiye", 39.9, 32.9, "Asia", "TUR", 4],
    SA: ["Saudi Arabia", 22.3, 39.1, "Middle East", "SAU", 5],
    AE: ["United Arab Emirates", 24.5, 54.4, "Middle East", "ARE", 4],
    QA: ["Qatar", 25.3, 51.5, "Middle East", "QAT", 4],
    EG: ["Egypt", 30, 31.2, "Africa", "EGY", 4],
    NG: ["Nigeria", 9.1, 7.5, "Africa", "NGA", 5],
    GH: ["Ghana", 5.6, -0.2, "Africa", "GHA", 4],
    KE: ["Kenya", -1.3, 36.8, "Africa", "KEN", "uk"],
    ZA: ["South Africa", -25.7, 28.2, "Africa", "ZAF", "uk"],
    UK: ["United Kingdom", 51.5, -.1, "Europe", "GBR", "uk"],
    DE: ["Germany", 52.5, 13.4, "Europe", "DEU", "de"],
    FR: ["France", 48.9, 2.35, "Europe", "FRA", 20],
    IT: ["Italy", 41.9, 12.5, "Europe", "ITA", 10],
    IE: ["Ireland", 53.3, -6.3, "Europe", "IRL", "uk"],
    BE: ["Belgium", 50.8, 4.4, "Europe", "BEL", 20],
    NL: ["Netherlands", 52.4, 4.9, "Europe", "NLD", 10],
    AT: ["Austria", 48.2, 16.4, "Europe", "AUT", "de"],
    CH: ["Switzerland", 46.9, 7.4, "Europe", "CHE", 6],
    SE: ["Sweden", 59.3, 18, "Europe", "SWE", 5],
    FI: ["Finland", 60.2, 24.9, "Europe", "FIN", 5],
    PL: ["Poland", 52.2, 21.0, "Europe", "POL", 5],
    HU: ["Hungary", 47.5, 19, "Europe", "HUN", 5],
    RU: ["Russia", 55.8, 37.6, "Europe", "RUS", 5],
    EU: ["EU (multi-country)", 50.8, 4.4, "Europe", "BEL", 4],
    US: ["United States", 38.9, -77, "North America", "USA", 4],
    CA: ["Canada", 45.4, -75.7, "North America", "CAN", 4],
    MX: ["Mexico", 19.4, -99.1, "North America", "MEX", 10],
    CO: ["Colombia", 4.7, -74.1, "South America", "COL", 5],
    BR: ["Brazil", -15.8, -47.9, "South America", "BRA", 10],
    AU: ["Australia", -35.3, 149.1, "Oceania", "AUS", 7],
    NZ: ["New Zealand", -41.3, 174.8, "Oceania", "NZL", 9]
};

const CUR = {
    UK: "£ GBP", DE: "€ EUR", FR: "€ EUR", IT: "€ EUR", IE: "€ EUR", BE: "€ EUR",
    NL: "€ EUR", AT: "€ EUR", FI: "€ EUR", EU: "€ EUR", SE: "SEK", HU: "HUF",
    CH: "CHF", PL: "zł PLN", RU: "₽ RUB", TR: "₺ TRY", JP: "¥ JPY", KR: "₩ KRW",
    CN: "¥ CNY", TW: "NT$ TWD", HK: "HK$ HKD", SG: "S$ SGD", MY: "RM MYR",
    SA: "SAR", AE: "AED", QA: "QAR", US: "US$", CA: "C$ CAD", AU: "A$ AUD",
    NZ: "NZ$", ZA: "R ZAR"
};

const CW = "BD IN PK LK NG GH KE UK AU CA SG NZ ZA MY".split(" ");
const DEV = "BD IN PK LK NP NG GH KE EG ID VN PH CO ZA".split(" ");

// name,country,levels,funding,elig,minCGPA fraction,deadline,award value,requirements,official site,history,source note
const R = [
    ["Chevening", "UK", "M", "F", "", .75, "Aug–early Oct/Nov", "Full tuition + monthly stipend (£) + flights + visa & arrival allowances", ".|IELTS 6.5 (course dependent)|2,800 hrs (~2 yrs) work|Not required|Leadership & networking essays, 3 UK course choices, 2 references; return home 2 yrs", "chevening.org", [[2025, 1500, null]], "UK FCDO: ~1,500 awards for 2025/26; 8,000+ awarded over the past 5 years (gov.uk, Aug 2024). Recent application totals not published."],
    ["Rhodes Scholarship", "UK", "MP", "F", "", .9, "Jul–Oct", "Full tuition & fees + annual stipend (£19,236/yr) + flights & visa", ".|IELTS 7.5 / TOEFL 110|Demonstrated leadership & community service|Outstanding intellect & academic achievements|Endorsement/nomination, 4–8 references, personal statement", "rhodeshouse.ox.ac.uk", [[2024, 105, null], [2025, 105, null]], "Rhodes Trust: ~105 Rhodes Scholars elected annually from 60+ countries worldwide."],
    ["Commonwealth Master's", "UK", "M", "F", "cw", .75, "Oct–Dec (via nominating agency)", "Full tuition + monthly stipend (£) + airfare", ".|IELTS 6.5|Not mandatory|Not required|Development-impact plan; must be unable to afford UK study", "cscuk.fcdo.gov.uk", [], ""],
    ["Commonwealth PhD Scholarships", "UK", "P", "F", "cw", .8, "Sept–Nov (via nominating agency)", "Full tuition + monthly stipend (£1,347/mo, £1,652 London) + return airfare", ".|IELTS 6.5–7.0|Not mandatory|High-impact research proposal & supervisor endorsement|Development impact plan; must be unable to afford UK study", "cscuk.fcdo.gov.uk", [[2024, 150, null], [2025, 140, null]], "Commonwealth Scholarship Commission (CSC UK) funded by UK FCDO."],
    ["Gates Cambridge", "UK", "MP", "F", "", .9, "Oct (US) / early Dec (international)", "Full cost: tuition + annual maintenance allowance (£) + airfare", ".|IELTS 7.5 (some courses 7.0)|Optional|Outstanding academics; PhD: strong research record|Leadership potential, commitment to improving others' lives, Cambridge admission", "gatescambridge.org", [[2024, 75, null], [2025, 95, null]], "Gates Cambridge Trust: 75 scholars (2024), 95 scholars (2025; 57 PhD, 38 MPhil). Application totals not published."],
    ["Clarendon (Oxford)", "UK", "MP", "F", "", .9, "Jan (with course application)", "Full tuition + living grant (£)", ".|IELTS 7.0|Optional|DPhil: strong publications help|Automatically considered with Oxford application", "ox.ac.uk/clarendon", [], ""],
    ["GREAT Scholarships", "UK", "M", "P", "", .7, "Varies by university", "£10,000 towards tuition", ".|IELTS 6.5|Not required|Not required|Offer from a participating UK university", "study-uk.britishcouncil.org", [], ""],
    ["DAAD Scholarships (EPOS & Research Grants)", "DE", "MP", "F", "", .8, "Aug–Oct", "Monthly stipend €992 + tuition, insurance, travel allowance", ".|IELTS 6.5 / TOEFL 90|2+ yrs post-degree work|Optional|Development-related field; motivation letter", "daad.de", [], ""],
    ["Erasmus Mundus Joint Masters", "EU", "M", "F", "", .8, "Oct–Feb (per programme)", "Tuition + participation costs + monthly allowance (typically €1,400)", ".|IELTS 6.5–7.0|Varies|Optional|Apply to each consortium; study in 2+ countries", "erasmus-plus.ec.europa.eu", [], ""],
    ["Eiffel Excellence", "FR", "MP", "F", "", .85, "Dec–Jan (via French institution)", "Monthly allowance €1,181 (Master's) / €1,400 (PhD) + travel", ".|English or French|Not required|PhD: research & publications|Nomination by a French institution; cannot apply directly", "campusfrance.org", [], ""],
    ["Italian Govt MAECI", "IT", "MP", "F", "", .75, "May–Jun", "Tuition exemption at public universities + €900/month grant + medical insurance", ".|English B2 or Italian B2|Not required|PhD: research proposal & university admission|Age limit ≤28 (Master's), ≤30 (PhD); apply on Study in Italy portal", "studyinitaly.esteri.it", [[2024, 1200, null]], "Ministero degli Affari Esteri e della Cooperazione Internazionale (MAECI Italy)."],
    ["DSU Regional Grants (Italy)", "IT", "BMP", "F", "", .65, "Jul–Sept (per region)", "100% tuition waiver + free university housing + daily meals + up to €7,000/yr cash grant", ".|English B2 or Italian B2|Not required|Not required|Needs-based: requires ISEE Parificato (family income/assets translated & legalised)", "dsu.toscana.it", [[2024, 8500, null]], "Italian Regional Right to Study Agencies (DSU Toscana, EDiSU, LazioDiSCo). Minimum course credit progression required."],
    ["Govt of Ireland Postgraduate (GOIPG)", "IE", "MP", "F", "", .85, "Sept–Oct", "Stipend of €22,000/year + tuition contribution up to €5,750 + €3,250/yr research expenses", ".|IELTS 6.5–7.0|Research potential|Detailed project proposal & academic supervisor agreement|Independent evaluation by international peer-review panels", "research.ie", [[2024, 280, 1100], [2025, 290, 1200]], "Research Ireland (formerly Irish Research Council): ~280 research awards annually across all disciplines."],
    ["Govt of Ireland International (GOI-IES)", "IE", "BMP", "F", "", .8, "Feb–Mar", "100% tuition fee waiver + €10,000 living stipend for 1 year of study", ".|IELTS 6.5|Not required|Not required|Offer letter from an eligible Irish institution; record of high academic achievement", "hea.ie", [[2024, 60, 1500]], "Higher Education Authority (HEA) Ireland: 60 competitive scholarships for outstanding non-EU students."],
    ["Master Mind Scholarships", "BE", "M", "F", "", .85, "Feb–Apr", "Living grant €10,000/year + tuition waiver (or reduced to administrative fee €131/yr)", ".|IELTS 7.0 / TOEFL 94|Not required|Academic excellence & motivation letter|Acceptance at participating Flemish university (KU Leuven, Ghent, Antwerp)", "studyinflanders.be", [[2024, 40, null], [2025, 45, null]], "Flemish Ministry of Education and Training: ~40–45 scholarships awarded annually."],
    ["Swiss Government Excellence", "CH", "P", "F", "", .85, "Sept–Nov (via Swiss embassy)", "CHF 1,920/month + tuition exemption + insurance", ".|English / host language B2|Not required|Research proposal + professor's acceptance|Age limit ~35; 2 references", "sbfi.admin.ch", [], ""],
    ["Swedish Institute Global Professionals", "SE", "M", "F", "", .75, "Jan–Feb", "SEK 15,000/month + tuition + travel grant", ".|IELTS 6.5|~3,000 hrs (2 yrs) work/leadership|Not required|Leadership; apply to Swedish programmes first", "si.se", [], ""],
    ["Finland Scholarships (EDUFI)", "FI", "M", "F", "", .8, "Jan (Joint Application)", "100% full tuition waiver for entire Master's degree + €5,000 relocation grant", ".|IELTS 6.5–7.0 / TOEFL 92|Not required|Not required|Applied through Studyinfo.fi alongside regular Finnish university application", "studyinfinland.fi", [[2024, 250, null]], "Finnish National Agency for Education (EDUFI) & participating Finnish research universities."],
    ["Ernst Mach Grant (Austria)", "AT", "P", "F", "", .8, "Feb–Mar", "Monthly grant €1,250/month + tuition exemption at Austrian universities + travel allowance", ".|English or German B2/C1|Research background|Written consent of academic supervisor at an Austrian university|Age limit ≤35 years; apply via grants.at portal", "grants.at", [[2024, 100, null]], "OeAD (Austrian Agency for Education and Internationalisation) funded by Austrian Federal Ministry BMBWF."],
    ["Stipendium Hungaricum", "HU", "BMP", "F", "", .75, "Nov–Jan (via national authority)", "Tuition-free + HUF 43,700/month (Bachelor/Master) + housing support", ".|English proof|Not required|PhD: research plan|Nomination by your country's authority, then online application", "stipendiumhungaricum.hu", [[2021, 4700, 50000], [2022, 4900, 50000], [2024, 4500, 66000], [2025, null, 80000]], "Hungarian Government / Tempus Public Foundation announcements (2021: ~50k applications, 4,700+ awards; 2022: 50k+, ~4,900; 2024: 66k+, ~4,500; 2025: 80k applications)."],
    ["Holland Scholarship", "NL", "BM", "P", "", .7, "Feb–May", "€5,000 one-time payment", ".|IELTS 6.0–6.5|Not required|Not required|Non-EEA student; admitted at participating Dutch institution", "studyinnl.org", [], ""],
    ["Stefan Banach (Poland)", "PL", "M", "F", "dev", .75, "May–Jun", "Full tuition waiver at Polish public universities + PLN 1,800/month living stipend", ".|English B2 or Polish B2|Not required|Not required|Bachelor degree completed within past 2 years; engineering, natural sciences, agriculture", "nawa.gov.pl", [[2023, 400, 2500], [2024, 450, 3000]], "Polish National Agency for Academic Exchange (NAWA) & Polish Ministry of Foreign Affairs."],
    ["Türkiye Scholarships (Türkiye Burslari)", "TR", "BMP", "F", "", .75, "Jan–Feb", "Tuition + housing + health insurance + flight + monthly stipend paid in ₺ (~US$125)", ".|Not required (Turkish prep year)|Not required|Optional|Min 70% (Bachelor), 75% (Master/PhD); age limits B ≤21, M ≤30, PhD ≤35", "turkiyeburslari.gov.tr", [[2024, null, 121830], [2025, 5000, 125668]], "YTB (Presidency for Turks Abroad): 121,830 applications (2024), 125,668 (2025). Awards ≈5,000/yr reported by secondary sources."],
    ["Russian Govt Quota", "RU", "BMP", "F", "", .7, "Nov–Feb", "Tuition-free + RUB stipend + dorm place", ".|Russian prep year|Not required|Optional|Apply via Russian education portal / embassy", "education-in-russia.com", [], ""],
    ["MEXT (Japan)", "JP", "BMP", "F", "", .75, "Apr–May (embassy)", "Monthly ¥117,000 (UG) / ¥144,000 (Master's) / ¥145,000 (PhD) + tuition + airfare", ".|Japanese or English|Not required|Master/PhD: research plan, professor contact|Age limits; written exams & interview", "studyinjapan.go.jp", [], ""],
    ["GKS (Korea)", "KR", "BMP", "F", "", .8, "Feb–Mar (embassy) / Sept (university)", "≈₩1,000,000/month + tuition + airfare + language training", ".|TOPIK or TOEFL 80+|Not required|Optional|Age limits; recommendation letters", "studyinkorea.go.kr", [], ""],
    ["Chinese Govt (CSC)", "CN", "BMP", "F", "", .75, "Dec–Apr", "¥2,500 / ¥3,000 / ¥3,500 monthly (UG / Master / PhD) + tuition + housing", ".|HSK or IELTS 6.0+|Not required|Master/PhD: study plan, 2 recommendations|Apply to university + CSC agency number", "campuschina.org", [], ""],
    ["Hong Kong PhD Fellowship (HKPFS)", "HK", "P", "F", "", .9, "Sept–early Dec", "Annual stipend HK$337,200 (~US$43,200) + HK$14,000/yr travel allowance for 3 years", ".|IELTS 6.5 / TOEFL 85|Research background preferred|Outstanding research ability & publication potential|Academic excellence, research ability, leadership & cultural diversity", "cerg1.ugc.edu.hk", [[2024, 300, 3000], [2025, 300, 3200]], "Research Grants Council (RGC) of Hong Kong: ~300 PhD fellowships across 8 UGC-funded universities."],
    ["Taiwan ICDF & MOE", "TW", "BMP", "F", "", .75, "Jan–Mar", "Full tuition + accommodation + flights + monthly stipend (NT$15k UG, NT$18k M, NT$20k PhD)", ".|TOCFL or IELTS 6.0|Not required|Master/PhD: study plan & 2 recommendation letters|Apply directly to partner program and Taiwan embassy/representative office", "icdf.org.tw", [[2024, 250, null]], "TaiwanICDF & Ministry of Education (MOE Taiwan) for citizens of partner countries."],
    ["SINGA (A*STAR)", "SG", "P", "F", "", .9, "Dec / Jun", "Monthly stipend ≈ S$2,700 + tuition + airfare", ".|IELTS 6.5|Optional|Strong research record|Doctoral research in Singapore", "a-star.edu.sg/singa", [], ""],
    ["Malaysia International Scholarship (MIS)", "MY", "MP", "F", "", .8, "May–Jun", "Full tuition fee waiver + monthly living allowance of RM 1,500/month", ".|IELTS 6.0 / TOEFL 70|Not required|Research proposal (min 1,000 words)|Offer from participating Malaysian public or premier private research university", "mohe.gov.my", [[2024, 150, null]], "Ministry of Higher Education (MOHE) Malaysia: open to international students from designated countries."],
    ["KAUST Fellowship", "SA", "MP", "F", "", .8, "Dec–Jan", "Full tuition + SAR stipend + housing", ".|IELTS 6.0 / TOEFL 79|Optional|Research experience valued|Funding included with admission", "kaust.edu.sa", [], ""],
    ["MBZUAI Full Scholarship", "AE", "MP", "F", "", .8, "Dec–Feb", "100% tuition waiver + monthly stipend (AED 8,000 M / AED 10,000 PhD) + housing + visa + flights", ".|IELTS 6.5 / TOEFL 90|Programming & math proficiency|PhD: research statement & publications valued|AI entrance exam & technical interview; CS/Math background", "mbzuai.ac.ae", [[2024, 200, 4000]], "Mohamed bin Zayed University of Artificial Intelligence (Abu Dhabi). All admitted graduate students receive 100% full funding."],
    ["Qatar University & HBKU", "QA", "BMP", "F", "", .8, "Jan–Mar", "100% tuition exemption + accommodation + round-trip flight + monthly QAR 5,000 stipend", ".|IELTS 6.5 / TOEFL 80|Not required|Master/PhD: research proposal & writing sample|Admission into eligible competitive degree program", "qu.edu.qa", [[2024, 500, null]], "Qatar University & Hamad Bin Khalifa University (HBKU) international graduate scholarships."],
    ["Fulbright Foreign Student", "US", "MP", "F", "ful", .75, "Varies by country", "Tuition + living stipend (US$) + airfare + insurance", ".|TOEFL ~100|Often required|Research or publications help|GRE/GMAT may be needed; national Fulbright commission", "foreign.fulbrightonline.org", [], ""],
    ["Knight-Hennessy (Stanford)", "US", "MP", "F", "", .92, "Early Oct", "Full tuition + living stipend (US$) + travel", ".|TOEFL 100+|2–3+ yrs typical|Strong research / impact|Leadership, 3 letters, Stanford admission", "kh.stanford.edu", [], ""],
    ["Joint Japan/World Bank (JJ/WBGSP)", "US", "M", "F", "dev", .75, "Mar–May", "100% tuition + monthly stipend + round-trip flights + US$500 travel allowance + medical insurance", ".|IELTS 6.5–7.0 / TOEFL 90|3+ yrs paid development work|Not required|Unconditional offer at preferred Master's program; commitment to return to home country", "worldbank.org/scholarships", [[2023, 160, 2200], [2024, 175, 2400]], "World Bank Development Economics Vice Presidency: over 6,000 development scholars funded."],
    ["Humphrey Fellowship (USA)", "US", "P", "F", "dev", .75, "Apr–Sept", "Full tuition at host US university + living allowance + professional development & travel grants", ".|TOEFL 71 / IELTS 6.0|5+ yrs substantive professional work|Demonstrated commitment to public leadership|Nominated by US Embassy / Fulbright Commission; 1-year non-degree leadership program", "humphreyfellowship.org", [[2024, 150, null]], "US Department of State Bureau of Educational and Cultural Affairs (ECA): ~150 fellows hosted annually."],
    ["Lester B. Pearson (UofT)", "CA", "B", "F", "", .95, "Nov–Dec (school nomination)", "4 yrs: tuition, books, incidentals & residence (C$)", ".|IELTS 6.5|N/A|N/A|Nominated by your school; leadership & creativity", "future.utoronto.ca/pearson", [], ""],
    ["McCall MacBain (McGill)", "CA", "M", "F", "", .85, "Aug (Intl) / Sept (US/CA)", "Full tuition & fees + $2,000/month living stipend + $2,000 relocation grant + mentorship", ".|IELTS 6.5–7.0|Community leadership & initiative|Strong academic foundation|Comprehensive leadership application, 3 references, final interviews in Montreal", "mccallmacbainscholars.org", [[2024, 30, 2500], [2025, 30, 2800]], "McCall MacBain Foundation & McGill University: 30 full scholars elected each year (~10 international)."],
    ["Vanier CGS (Canada)", "CA", "P", "F", "", .9, "Nov (university nomination)", "C$50,000 per year for up to 3 years", ".|English / French|Optional|Strong publications & research|Nominated by Canadian university; leadership", "vanier.gc.ca", [], ""],
    ["Australian Government RTP", "AU", "MP", "F", "", .85, "Aug–Oct (main round)", "100% tuition offset + living stipend (A$32,192–A$36,000/yr tax-free) + relocation", ".|IELTS 6.5–7.0|Research experience or publications|High-impact research proposal & supervisor endorsement|Assessed on academic merit & research performance; university nomination", "education.gov.au/research-training-program", [[2024, 1800, null]], "Australian Department of Education: ~A$300M+ allocated annually across higher education providers."],
    ["Australia Awards", "AU", "MP", "F", "dev", .75, "Feb–Apr", "Full tuition + living allowance (A$) + travel + insurance", ".|IELTS 6.5|2+ yrs work|Optional|Return home 2 yrs; developing-country citizen", "australiaawards.gov.au", [], ""],
    ["University Merit Awards (Australia)", "AU", "MP", "P", "", .85, "Varies", "25%–100% tuition (A$)", ".|IELTS 6.5|Not required|PhD: research proposal|Often automatic with offer", "studyaustralia.gov.au", [], ""],
    ["Manaaki New Zealand", "NZ", "MP", "F", "dev", .75, "Feb–Mar", "Tuition + living allowance (NZ$) + travel", ".|IELTS 6.5|2+ yrs work|Optional|Development focus; return home after study", "mfat.govt.nz/manaaki", [], ""]
].map((a, i) => ({
    id: i,
    name: a[0],
    c: a[1],
    lv: a[2],
    f: a[3],
    o: a[4],
    m: a[5],
    dl: a[6],
    aw: a[7],
    q: a[8].split("|").slice(1),
    u: a[9],
    h: a[10],
    src: a[11]
}));

const DOM = {
    E: "Engineering & Tech",
    N: "Natural Sciences",
    H: "Health & Medicine",
    B: "Business & Economics",
    S: "Social Sci & Policy",
    L: "Law",
    A: "Agriculture & Environment",
    U: "Arts & Humanities"
};

const FD = {
    "DAAD Scholarships (EPOS & Research Grants)": "BSEHAL",
    "Eiffel Excellence": "EBLS",
    "SINGA (A*STAR)": "EN",
    "KAUST Fellowship": "ENA",
    "Australia Awards": "EBSHA",
    "Manaaki New Zealand": "EAS",
    "MBZUAI Full Scholarship": "E",
    "Stefan Banach (Poland)": "ENAL",
    "Malaysia International Scholarship (MIS)": "ENBH",
    "Joint Japan/World Bank (JJ/WBGSP)": "BSEHAL",
    "Humphrey Fellowship (USA)": "SBHAL"
};
const fieldsOf = s => FD[s.name] || "*";

const PL = {
    "Chevening": { M: "Any eligible one-year taught Master's at a UK university; choose up to 3 courses." },
    "Rhodes Scholarship": { M: "Full-time Oxford Master's (MSc, MPhil, BCL, etc.) in any subject.", P: "DPhil (PhD) at the University of Oxford in any subject." },
    "Commonwealth Master's": { M: "Taught Master's courses at participating UK universities with development priority." },
    "Commonwealth PhD Scholarships": { P: "Full-time doctoral research at any participating UK university." },
    "Gates Cambridge": { M: "Full-time Cambridge Master's (MPhil, MSc, MLitt, LLM, MBA etc.) in any subject.", P: "PhD at the University of Cambridge in any subject." },
    "Erasmus Mundus Joint Masters": { M: "Joint Master's programmes run by consortia across 2+ countries; browse the official EMJM catalogue." },
    "Eiffel Excellence": { M: "Master's in engineering, economics & management, law or political science at a French institution.", P: "Doctoral work in the same domains with a French institution." },
    "Italian Govt MAECI": { M: "Laurea Magistrale (2-year Master's degree) at Italian state universities.", P: "Dottorato di Ricerca (PhD) under academic supervision in Italy." },
    "DSU Regional Grants (Italy)": { B: "3-year Laurea Triennale (Bachelor's) at regional universities.", M: "2-year Laurea Magistrale (Master's) at regional universities.", P: "Dottorato di Ricerca (PhD) programs." },
    "Govt of Ireland Postgraduate (GOIPG)": { M: "Research Master's (1–2 years) at an eligible Irish HEI.", P: "PhD research (up to 4 years) at an eligible Irish HEI." },
    "Govt of Ireland International (GOI-IES)": { B: "Final year of undergraduate study at an Irish HEI.", M: "1-year taught or research Master's degree at an Irish HEI.", P: "1 year of PhD study at an Irish HEI." },
    "Master Mind Scholarships": { M: "Eligible Master's programs across Flemish universities (KU Leuven, Ghent, Antwerp, Hasselt, VUB)." },
    "Finland Scholarships (EDUFI)": { M: "2-year international Master's degree at Finnish research universities." },
    "Ernst Mach Grant (Austria)": { P: "Research grants for PhD students and young academics at Austrian universities (1–9 months)." },
    "Stipendium Hungaricum": { B: "Full-degree programmes at Hungarian institutions (800+ in 2024/25, Bachelor to doctoral).", M: "Master's and one-tier Master's programmes at Hungarian institutions.", P: "Doctoral programmes at Hungarian institutions." },
    "Holland Scholarship": { B: "Bachelor's at participating Dutch institutions.", M: "Master's at participating Dutch institutions." },
    "Stefan Banach (Poland)": { M: "Full-time second-cycle (Master's) programs in engineering, technical, agricultural, and natural sciences." },
    "Türkiye Scholarships (Türkiye Burslari)": { B: "Associate/Bachelor at Turkish universities; placement is done by YTB.", M: "Master's at Turkish universities; placement by YTB.", P: "Doctoral programmes at Turkish universities." },
    "MEXT (Japan)": { B: "Undergraduate students (4-year degree).", M: "Research student route leading to a Master's.", P: "Research student route leading to a doctorate." },
    "GKS (Korea)": { B: "Undergraduate degree at Korean universities.", M: "Master's degree at Korean universities.", P: "PhD degree at Korean universities." },
    "Chinese Govt (CSC)": { B: "Undergraduate programs at Chinese universities.", M: "Master's programs at Chinese universities.", P: "PhD programs at Chinese universities." },
    "Hong Kong PhD Fellowship (HKPFS)": { P: "3-year PhD fellowship at HKU, CUHK, HKUST, CityU, PolyU, HKBU, Lingnan, or EdUHK." },
    "Taiwan ICDF & MOE": { B: "Undergraduate degree programs at partner Taiwanese universities.", M: "Master's degree programs at partner Taiwanese universities.", P: "PhD degree programs at partner Taiwanese universities." },
    "SINGA (A*STAR)": { P: "PhD at partner Singapore universities with A*STAR research institutes." },
    "Malaysia International Scholarship (MIS)": { M: "Full-time Master's study at participating Malaysian public or research universities.", P: "Full-time PhD study at participating Malaysian public or research universities." },
    "MBZUAI Full Scholarship": { M: "MSc in Computer Science, Machine Learning, Computer Vision, or NLP.", P: "PhD in Machine Learning, Computer Vision, NLP, or Robotics." },
    "Qatar University & HBKU": { B: "Undergraduate programs at Qatar University.", M: "Master's programs across colleges at QU or HBKU.", P: "PhD programs at QU or HBKU." },
    "Fulbright Foreign Student": { M: "Master's at US universities (country-specific placement).", P: "PhD or research at US universities." },
    "Joint Japan/World Bank (JJ/WBGSP)": { M: "Selected preferred Master's programs in development topics (Harvard, Oxford, Columbia, Erasmus, etc.)." },
    "Humphrey Fellowship (USA)": { P: "1-year non-degree professional and academic fellowship at a designated US university." },
    "Lester B. Pearson (UofT)": { B: "Undergraduate degree at the University of Toronto." },
    "McCall MacBain (McGill)": { M: "Master's degrees (MA, MSc, MPP, LLM, etc.) and second-entry professional undergraduate degrees at McGill." },
    "Vanier CGS (Canada)": { P: "Doctoral study at a Canadian university in health, natural sciences & engineering, or social sciences & humanities." },
    "Australian Government RTP": { M: "Master's by Research (up to 2 years) at an Australian university.", P: "Doctoral degree (PhD, up to 3.5–4 years) at an Australian university." },
    "Australia Awards": { M: "Master's degrees in priority development areas.", P: "PhD research in priority development areas." },
    "Swiss Government Excellence": { P: "Doctoral/postdoctoral research at Swiss universities; Master's in arts for some countries." }
};

const DP = [
    ["Development Economics (MSc)", "Univ. Göttingen", "B", "M"],
    ["International & Development Economics – MIDE", "", "B", "M"],
    ["SEPT MBA", "Univ. Leipzig", "B", "M"],
    ["Development Management (MA)", "Ruhr-Univ. Bochum", "S", "M"],
    ["Development Cooperation", "", "S", "M"],
    ["Sustainable Development Management", "", "S", "M"],
    ["SPRING – Regional Development Planning & Management", "", "S", "M"],
    ["Vocational Education & Personnel Capacity Building", "TU Dresden", "S", "M"],
    ["Hydro Science & Engineering (MSc)", "TU Dresden", "E", "M"],
    ["Textile Machinery & High Performance Material Technology", "TU Dresden", "E", "M"],
    ["Energy & Environmental Management (MEng)", "", "E", "M"],
    ["Infrastructure Planning", "", "E", "M"],
    ["Renewable Energy (PPRE / Sustainable Renewable Energy Technologies)", "Univ. Oldenburg", "E", "M"],
    ["Integrated Urbanism & Sustainable Design", "", "E", "M"],
    ["Tropical Forestry (MSc)", "TU Dresden", "A", "M"],
    ["Natural Resources Management & Development (NRM)", "TH Köln", "A", "M"],
    ["Bioeconomy & Rural Development", "Giessen / Hohenheim", "A", "M"],
    ["Agricultural Economics (MSc)", "Univ. Hohenheim", "A", "M"],
    ["Environmental Governance (MSc)", "Univ. Freiburg", "A", "M"],
    ["International Health (MSc)", "Berlin / Heidelberg", "H", "M"],
    ["Global Urban Health (MSc)", "", "H", "M"],
    ["Intellectual Property & Competition Law (LLM)", "", "L", "M"],
    ["Study Scholarships – Master's, all disciplines (selected countries only)", "DAAD", "*", "M"],
    ["Bonn International Graduate School for Development Research (BIGS-DR)", "Univ. Bonn", "S", "P"],
    ["Research Grants – Doctoral Programmes in Germany", "DAAD", "*", "P"]
];

const $ = i => document.getElementById(i);
const LV = { B: "Bachelor's", M: "Master's", P: "PhD" };

// State object
let S = {
    o: "BD",          // origin country
    l: [],            // degree level(s)
    f: [],            // fund type(s)
    g: [],            // destination region(s)
    d: [],            // domain/field(s)
    dst: [],          // desired country/countries
    exp: [],          // work experience filter(s)
    lang: [],         // language requirement(s)
    q: "",            // search query
    userCGPA: null,   // user entered CGPA / academic grade
    matchOnly: false, // filter to eligible / competitive only
    viewSaved: false, // view bookmarked only
    sort: "default",  // sorting mode: "default", "name", "match", "deadline"
    sel: null         // selected scholarship ID
};

// Bookmarks / Favorites Storage
let FAV = new Set();
try {
    const rawFavs = localStorage.getItem("wse_favs");
    if (rawFavs) JSON.parse(rawFavs).forEach(id => FAV.add(+id));
} catch (err) {
    console.warn("Could not read favorites from localStorage", err);
}

function saveFavs() {
    try {
        localStorage.setItem("wse_favs", JSON.stringify([...FAV]));
    } catch (err) {
        console.warn("Could not write favorites to localStorage", err);
    }
}

function toggleFav(id, e) {
    if (e) {
        e.stopPropagation();
        e.preventDefault();
    }
    if (FAV.has(id)) {
        FAV.delete(id);
        showToast("Removed from saved shortlist");
    } else {
        FAV.add(id);
        showToast("❤️ Saved to your shortlist!");
    }
    saveFavs();
    updateFavBadge();
    render();
}

function updateFavBadge() {
    const badge = $("favBadge");
    if (badge) badge.textContent = FAV.size;
}

function getScaleInfo() {
    const sc = C[S.o][5];
    if (sc === "uk") return { label: "Scale: UK % (Honours)", placeholder: "e.g. 68 (Percentage)" };
    if (sc === "de") return { label: "Scale: DE (1.0 Best)", placeholder: "e.g. 1.8 (1.0 - 4.0)" };
    return { label: `Scale: ${sc}.0 Max`, placeholder: `e.g. ${(sc * 0.85).toFixed(sc == 10 || sc == 20 ? 1 : 2)}` };
}

function updateScaleTag() {
    const info = getScaleInfo();
    const tag = $("scaleTag");
    if (tag) tag.textContent = info.label;
    const inp = $("cgpaInput");
    if (inp && !inp.value) inp.placeholder = info.placeholder;
}

function getMatch(s) {
    if (S.userCGPA === null || isNaN(S.userCGPA)) return null;
    const sc = C[S.o][5];
    let userFrac;
    if (sc === "uk") {
        userFrac = S.userCGPA / 100;
    } else if (sc === "de") {
        userFrac = (4.0 - S.userCGPA) / 3.0; // 1.0 -> 1.0, 4.0 -> 0.0
    } else {
        userFrac = S.userCGPA / sc;
    }

    const diff = userFrac - s.m;
    if (diff >= 0) {
        return { tier: "high", label: "High Match", cls: "match-high", icon: "🟢", diff };
    } else if (diff >= -0.06) {
        return { tier: "good", label: "Competitive", cls: "match-good", icon: "🟡", diff };
    } else {
        return { tier: "reach", label: "Reach", cls: "match-reach", icon: "⚪", diff };
    }
}

function matchExp(s) {
    if (!S.exp || S.exp.length === 0) return true;
    const expText = (s.q[1] || "").toLowerCase();
    const needsYears = expText.includes("2+") || expText.includes("3+") || expText.includes("years") || expText.includes("2 years") || expText.includes("3-5");
    if (S.exp.includes("none") && S.exp.includes("req")) return true;
    if (S.exp.includes("none")) return !needsYears;
    if (S.exp.includes("req")) return needsYears;
    return true;
}

function matchLang(s) {
    if (!S.lang || S.lang.length === 0) return true;
    const langText = (s.q[0] || "").toLowerCase();
    const isExempt = langText.includes("exempt") || langText.includes("medium of instruction") || langText.includes("waiver") || langText.includes("no test") || langText.includes("english-taught") || langText.includes("chinese-taught") || langText.includes("french-taught") || langText.includes("korean-taught") || langText.includes("japanese-taught");
    const isIelts = langText.includes("ielts");
    if (S.lang.includes("exempt") && S.lang.includes("ielts")) return isExempt || isIelts;
    if (S.lang.includes("exempt")) return isExempt;
    if (S.lang.includes("ielts")) return isIelts;
    return true;
}

function cg(m) {
    const sc = C[S.o][5];
    if (sc == "uk") return m >= .9 ? "First class (70%+)" : m >= .75 ? "Upper second 2:1 (60%+)" : "Lower second 2:2 (50%+)";
    if (sc == "de") return m >= .9 ? "≤ 1.5 (1.0 = best)" : m >= .75 ? "≤ 2.5 (1.0 = best)" : "≤ 3.0 (1.0 = best)";
    return `≈ ${(m * sc).toFixed(sc == 10 || sc == 20 ? 1 : 2)} / ${sc}`;
}

const km = (a, b) => {
    const r = Math.PI / 180;
    const d = Math.sin((b[1] - a[1]) * r / 2) ** 2 + Math.cos(a[1] * r) * Math.cos(b[1] * r) * Math.sin((b[2] - a[2]) * r / 2) ** 2;
    return 12742 * Math.asin(Math.sqrt(d));
};

function chips(id, opts, key) {
    const el = $(id);
    if (!el) return;
    const activeValues = Array.isArray(S[key]) ? S[key] : (S[key] ? [S[key]] : []);
    const isAll = activeValues.length === 0;

    el.innerHTML = opts.map(([v, t]) => {
        const isOn = (v === "" && isAll) || (v !== "" && activeValues.includes(v));
        return `<button type="button" class="chip ${isOn ? "on" : ""}" data-v="${v}">${t}</button>`;
    }).join("");

    el.onclick = e => {
        const target = e.target.closest(".chip");
        if (!target || target.dataset.v === undefined) return;
        const val = target.dataset.v;

        if (!Array.isArray(S[key])) S[key] = [];

        if (val === "") {
            // Clicked "All" -> reset this filter
            S[key] = [];
        } else {
            // Clicked a specific option -> toggle it
            const idx = S[key].indexOf(val);
            if (idx > -1) {
                S[key].splice(idx, 1);
            } else {
                S[key].push(val);
            }
        }
        S.sel = null;

        // If region filter changed, remove any destination countries that no longer belong to selected regions
        if (key === "g" && S.dst && S.dst.length > 0 && S.g.length > 0) {
            S.dst = S.dst.filter(c => C[c] && S.g.includes(C[c][3]));
        }

        render();
    };
}

function updateFilterTag(tagId, activeArray, defaultText) {
    const el = $(tagId);
    if (!el) return;
    if (activeArray && activeArray.length > 0) {
        el.textContent = `${activeArray.length} selected`;
        el.classList.add("active");
    } else {
        el.textContent = defaultText;
        el.classList.remove("active");
    }
}

function updateAllFilterTags() {
    updateFilterTag("lvlTag", S.l, "Multi-select");
    updateFilterTag("fundTag", S.f, "Multi-select");
    updateFilterTag("domTag", S.d, "Multi-select");
    updateFilterTag("regTag", S.g, "Multi-select");
    updateFilterTag("expTag", S.exp, "Multi-select");
    updateFilterTag("langTag", S.lang, "Multi-select");

    const dstTag = $("dstLabelTag");
    if (dstTag) {
        if (S.dst && S.dst.length > 0) {
            dstTag.textContent = `${S.dst.length} selected`;
            dstTag.classList.add("active");
        } else if (S.g && S.g.length > 0) {
            dstTag.textContent = `Filtered by ${S.g.length} region${S.g.length > 1 ? "s" : ""}`;
            dstTag.classList.remove("active");
        } else {
            dstTag.textContent = "Multi-select";
            dstTag.classList.remove("active");
        }
    }
}

// Initialize Origin Select
$("org").innerHTML = Object.entries(C)
    .filter(([k]) => k != "EU")
    .sort((a, b) => a[1][0].localeCompare(b[1][0]))
    .map(([k, v]) => `<option value="${k}">${v[0]}</option>`)
    .join("");
$("org").value = "BD";
$("org").onchange = e => {
    S.o = e.target.value;
    if (Array.isArray(S.dst)) {
        S.dst = S.dst.filter(x => x !== S.o);
    } else if (S.dst === S.o) {
        S.dst = [];
    }
    S.sel = null;
    updateScaleTag();
    populateDestinations();
    render();
};

let dstSearchQuery = "";
let isDstOpen = false;

// Populate Desired Destination Countries (filtered by selected Region S.g if any)
function populateDestinations() {
    let destCodes = [...new Set(R.map(s => s.c))].filter(c => C[c] && c !== S.o);

    if (S.g && S.g.length > 0) {
        destCodes = destCodes.filter(c => S.g.includes(C[c][3]));
    }
    destCodes.sort((a, b) => C[a][0].localeCompare(C[b][0]));

    if (S.dst && S.dst.length > 0) {
        S.dst = S.dst.filter(c => destCodes.includes(c));
    }

    renderDstPicker(destCodes);
}

function renderDstPicker(destCodes) {
    const trigger = $("dstTrigger");
    const display = $("dstDisplay");
    const dropdown = $("dstDropdown");
    const listEl = $("dstList");
    const countEl = $("dstAvailableCount");

    if (!trigger || !display || !dropdown || !listEl) return;

    if (countEl) countEl.textContent = `${destCodes.length} countries`;

    // Render Display Box (selected pills or placeholder)
    if (!S.dst || S.dst.length === 0) {
        const countText = S.g && S.g.length > 0
            ? `All Countries in ${S.g.join(", ")} (${destCodes.length})`
            : `All Desired Countries (${destCodes.length})`;
        display.innerHTML = `<span class="multi-select-placeholder">${countText}</span>`;
    } else {
        display.innerHTML = S.dst.map(c => `
            <span class="ms-pill" data-c="${c}">
                <span>${C[c] ? C[c][0] : c}</span>
                <button type="button" class="ms-pill-remove" data-remove="${c}" title="Remove ${C[c] ? C[c][0] : c}" aria-label="Remove">✕</button>
            </span>
        `).join("");
    }

    // Filter by search query
    const filteredCodes = destCodes.filter(c => {
        if (!dstSearchQuery) return true;
        const name = (C[c] ? C[c][0] : "").toLowerCase();
        const reg = (C[c] ? C[c][3] : "").toLowerCase();
        const code = c.toLowerCase();
        return name.includes(dstSearchQuery) || reg.includes(dstSearchQuery) || code.includes(dstSearchQuery);
    });

    const currentList = list();
    const scCount = {};
    currentList.forEach(s => scCount[s.c] = (scCount[s.c] || 0) + 1);

    if (filteredCodes.length === 0) {
        listEl.innerHTML = `<div style="padding:12px;text-align:center;color:var(--mu);font-size:12px">No matching countries found</div>`;
    } else {
        listEl.innerHTML = filteredCodes.map(c => {
            const isSelected = S.dst && S.dst.includes(c);
            const countryName = C[c] ? C[c][0] : c;
            const region = C[c] ? C[c][3] : "";
            const count = scCount[c] || 0;
            return `
                <div class="multi-select-item ${isSelected ? "selected" : ""}" data-c="${c}">
                    <input type="checkbox" ${isSelected ? "checked" : ""} tabindex="-1">
                    <span class="item-name">${countryName}</span>
                    ${count > 0 ? `<small style="color:var(--ac);font-weight:700">(${count})</small>` : ""}
                    <span class="item-region">${region}</span>
                </div>
            `;
        }).join("");
    }
}

function setupDstPicker() {
    const trigger = $("dstTrigger");
    const dropdown = $("dstDropdown");
    const searchInput = $("dstSearch");
    const listEl = $("dstList");
    const btnSelectAll = $("btnDstSelectAll");
    const btnClear = $("btnDstClear");

    if (!trigger || !dropdown) return;

    trigger.onclick = e => {
        const rmBtn = e.target.closest(".ms-pill-remove");
        if (rmBtn) {
            e.stopPropagation();
            const rmCode = rmBtn.dataset.remove;
            if (rmCode && S.dst) {
                S.dst = S.dst.filter(x => x !== rmCode);
                S.sel = null;
                render();
            }
            return;
        }

        isDstOpen = !isDstOpen;
        dropdown.style.display = isDstOpen ? "flex" : "none";
        trigger.classList.toggle("open", isDstOpen);
        trigger.setAttribute("aria-expanded", isDstOpen ? "true" : "false");
        if (isDstOpen && searchInput) {
            searchInput.focus();
        }
    };

    if (searchInput) {
        searchInput.oninput = e => {
            dstSearchQuery = e.target.value.trim().toLowerCase();
            let destCodes = [...new Set(R.map(s => s.c))].filter(c => C[c] && c !== S.o);
            if (S.g && S.g.length > 0) destCodes = destCodes.filter(c => S.g.includes(C[c][3]));
            destCodes.sort((a, b) => C[a][0].localeCompare(C[b][0]));
            renderDstPicker(destCodes);
        };
    }

    if (btnSelectAll) {
        btnSelectAll.onclick = e => {
            e.stopPropagation();
            let destCodes = [...new Set(R.map(s => s.c))].filter(c => C[c] && c !== S.o);
            if (S.g && S.g.length > 0) destCodes = destCodes.filter(c => S.g.includes(C[c][3]));
            S.dst = [...destCodes];
            S.sel = null;
            render();
        };
    }

    if (btnClear) {
        btnClear.onclick = e => {
            e.stopPropagation();
            S.dst = [];
            S.sel = null;
            render();
        };
    }

    if (listEl) {
        listEl.onclick = e => {
            const item = e.target.closest(".multi-select-item");
            if (!item || !item.dataset.c) return;
            const code = item.dataset.c;
            if (!Array.isArray(S.dst)) S.dst = [];
            const idx = S.dst.indexOf(code);
            if (idx > -1) {
                S.dst.splice(idx, 1);
            } else {
                S.dst.push(code);
            }
            S.sel = null;
            render();
            if (S.dst.length === 1) {
                const destScholarships = list();
                if (destScholarships.length > 0) {
                    S.sel = destScholarships[0].id;
                    detail();
                    fly();
                }
            }
        };
    }

    document.addEventListener("click", e => {
        if (!e.target.closest("#dstPicker")) {
            if (isDstOpen) {
                isDstOpen = false;
                dropdown.style.display = "none";
                trigger.classList.remove("open");
                trigger.setAttribute("aria-expanded", "false");
            }
        }
    });
}

// CGPA Input
$("cgpaInput").oninput = e => {
    const val = parseFloat(e.target.value);
    S.userCGPA = isNaN(val) ? null : val;
    render();
};

// Eligible Only Toggle Button
$("btnMatchOnly").onclick = () => {
    S.matchOnly = !S.matchOnly;
    $("btnMatchOnly").classList.toggle("active", S.matchOnly);
    render();
};

// View Tabs (All vs Saved)
$("tabAll").onclick = () => {
    S.viewSaved = false;
    $("tabAll").classList.add("active");
    $("tabFavs").classList.remove("active");
    render();
};

$("tabFavs").onclick = () => {
    S.viewSaved = true;
    $("tabFavs").classList.add("active");
    $("tabAll").classList.remove("active");
    render();
};

// Sort Select
$("sortSelect").onchange = e => {
    S.sort = e.target.value;
    render();
};

// Export Button
$("btnExport").onclick = exportShortlist;

// Reset Filters Button
$("btnResetFilters").onclick = () => {
    S.l = [];
    S.f = [];
    S.g = [];
    S.d = [];
    S.dst = [];
    S.exp = [];
    S.lang = [];
    S.q = "";
    S.userCGPA = null;
    S.matchOnly = false;
    S.viewSaved = false;
    S.sort = "default";
    dstSearchQuery = "";
    if ($("dstSearch")) $("dstSearch").value = "";
    $("cgpaInput").value = "";
    $("btnMatchOnly").classList.remove("active");
    $("searchInput").value = "";
    $("sortSelect").value = "default";
    $("tabAll").classList.add("active");
    $("tabFavs").classList.remove("active");
    S.sel = null;
    updateScaleTag();
    render();
};

// Search Input
$("searchInput").oninput = e => {
    S.q = e.target.value.trim().toLowerCase();
    render();
};

const ok = s => s.c !== S.o && (s.o == "cw" ? CW.includes(S.o) : s.o == "dev" ? DEV.includes(S.o) : s.o == "ful" ? S.o != "US" : true);

const list = () => R.filter(s => {
    if (!ok(s)) return false;
    if (S.viewSaved && !FAV.has(s.id)) return false;
    if (S.l && S.l.length > 0 && !S.l.some(lvl => s.lv.includes(lvl))) return false;
    if (S.f && S.f.length > 0 && !S.f.includes(s.f)) return false;
    if (S.g && S.g.length > 0 && !S.g.includes(C[s.c][3])) return false;
    if (S.dst && S.dst.length > 0 && !S.dst.includes(s.c)) return false;
    if (S.d && S.d.length > 0) {
        const fields = fieldsOf(s);
        if (fields !== "*" && !S.d.some(d => fields.includes(d))) return false;
    }
    if (S.q && !s.name.toLowerCase().includes(S.q) && !(C[s.c] && C[s.c][0].toLowerCase().includes(S.q))) return false;
    if (!matchExp(s)) return false;
    if (!matchLang(s)) return false;
    if (S.matchOnly && S.userCGPA !== null) {
        const m = getMatch(s);
        if (!m || (m.tier !== "high" && m.tier !== "good")) return false;
    }
    return true;
});

function sortScholarships(arr) {
    const sorted = [...arr];
    if (S.sort === "name") {
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (S.sort === "deadline") {
        return sorted.sort((a, b) => a.dl.localeCompare(b.dl));
    }
    if (S.sort === "match") {
        return sorted.sort((a, b) => {
            const ma = getMatch(a), mb = getMatch(b);
            const da = ma ? ma.diff : -a.m;
            const db = mb ? mb.diff : -b.m;
            return db - da;
        });
    }
    // Default: Region then Country then Name
    return sorted.sort((a, b) => C[a.c][3].localeCompare(C[b.c][3]) || a.c.localeCompare(b.c) || a.name.localeCompare(b.name));
}

const fm = n => n == null ? '<span class="na">Not published</span>' : n.toLocaleString();

function render() {
    chips("lvl", [["", "All"], ["B", "Bachelor's"], ["M", "Master's"], ["P", "PhD"]], "l");
    chips("fund", [["", "All"], ["F", "Full-funded"], ["P", "Partial"]], "f");
    chips("dom", [["", "All"], ...Object.entries(DOM)], "d");
    chips("reg", [["", "All"], ...[...new Set(Object.values(C).map(c => c[3]))].sort().map(r => [r, r])], "g");
    chips("expFilter", [["", "All"], ["none", "2+ Yrs Needed"], ["req", "Work Exp Required"]], "exp");
    chips("langFilter", [["", "All"], ["exempt", "Waiver / MOI OK"], ["ielts", "IELTS Specified"]], "lang");

    updateAllFilterTags();
    populateDestinations();
    updateFavBadge();

    const L = list();
    $("cntBadge").textContent = L.length;
    $("mobileCount").textContent = L.length;

    const sortedList = sortScholarships(L);

    let h = "", last = "";
    sortedList.forEach(s => {
        const rg = C[s.c][3];
        // Only show region separators in default sort mode
        if (S.sort === "default" && rg !== last) {
            h += `<div class="rg">${rg.toUpperCase()}</div>`;
            last = rg;
        }
        const isSelected = S.sel === s.id;
        const isFav = FAV.has(s.id);
        const match = getMatch(s);

        h += `
                <div class="card ${isSelected ? "sel expanded" : ""}" data-i="${s.id}">
                    <div class="card-header-line">
                        <h3>${s.name}</h3>
                        <div class="card-header-actions">
                            <button type="button" class="btn-card-fav ${isFav ? "active" : ""}" data-fav="${s.id}" title="${isFav ? "Remove from saved" : "Save to shortlist"}" aria-label="Favorite">
                                ${isFav ? "❤️" : "🤍"}
                            </button>
                            <span class="card-expand-toggle" title="${isSelected ? "Collapse details" : "Expand details"}">
                                ${isSelected ? "▲" : "▼"}
                            </span>
                        </div>
                    </div>
                    <div class="card-meta">
                        <span class="tag ${s.f}">${s.f == "F" ? "Fully Funded" : "Partial"}</span>
                        ${[...s.lv].map(x => `<span class="tag L">${LV[x]}</span>`).join("")}
                        ${match ? `<span class="match-pill ${match.cls}">${match.icon} ${match.label}</span>` : ""}
                        <span class="meta-country">📍 ${C[s.c][0]}</span>
                        <span>⏳ ${s.dl}</span>
                        <span>💰 ${CUR[s.c] || ""}</span>
                    </div>
                    ${isSelected ? renderCardDetailHtml(s) : ""}
                </div>`;
    });

    if (!h) {
        const emptyMsg = S.viewSaved
            ? 'No saved scholarships yet. Click the heart ❤️ icon on any scholarship card to save it to your shortlist!'
            : 'No matching scholarships found. Try relaxing your filters or grade criteria.';
        h = `<div class="note" style="text-align:center;padding:24px 16px">${emptyMsg}</div>`;
    }

    $("list").innerHTML = h;

    $("list").onclick = e => {
        const favBtn = e.target.closest(".btn-card-fav");
        if (favBtn) {
            const id = +favBtn.dataset.fav;
            toggleFav(id, e);
            return;
        }

        // If clicking interactive buttons/links inside the expanded card, do not toggle collapse
        if (e.target.closest("a, button:not(.btn-close-detail-inline), input, select, table")) {
            return;
        }

        const closeBtn = e.target.closest(".btn-close-detail-inline");
        if (closeBtn) {
            e.stopPropagation();
            S.sel = null;
            render();
            fly();
            return;
        }

        const c = e.target.closest(".card");
        if (c) {
            const clickedId = +c.dataset.i;
            if (S.sel === clickedId) {
                // Clicking already expanded card collapses it in place
                S.sel = null;
            } else {
                // Expand card in its current position
                S.sel = clickedId;
            }
            render();
            fly();
            // Stays in current position - NO jump/scroll to top!
        }
    };

    detail();
    draw();
    checkMapZoom();
}

function renderCardDetailHtml(s) {
    const T = ["English", "Experience", "Research & publications", "Skills & documents"];
    const hs = s.h;
    const last = [...hs].reverse().find(x => x[1] != null && x[2] != null);
    const rate = last ? (last[1] / last[2] * 100).toFixed(1) + "% (" + last[0] + ")" : null;
    const mx = Math.max(1, ...hs.map(x => x[1] || 0));
    const match = getMatch(s);

    let cgpaDisplay = `<b>${cg(s.m)}</b> <small class="meta">approx. typical level</small>`;
    if (match) {
        cgpaDisplay = `<div><b>${cg(s.m)}</b> <span class="match-pill ${match.cls}" style="margin-left:6px">${match.icon} ${match.label}</span></div>
                       <small style="color:var(--mu);display:block;margin-top:2px">Your entered score: ${S.userCGPA} (${match.diff >= 0 ? "+" : ""}${(match.diff * (typeof C[S.o][5] === "number" ? C[S.o][5] : 100)).toFixed(1)} pts relative to cutoff)</small>`;
    }

    return `
        <div class="card-inline-detail" onclick="event.stopPropagation()">
            <div class="award">💰 <b>Award (${CUR[s.c] || ""}):</b> ${s.aw}</div>
            <div class="req">
                <span>CGPA (your scale)</span>
                <span>${cgpaDisplay}</span>
                ${s.q.map((x, i) => `<span>${T[i]}</span><span>${x}</span>`).join("")}
            </div>
            ${prog(s)}
            <div class="stats">
                <div class="stat"><b>${rate || '<span class="na">Not published</span>'}</b>success rate</div>
                <div class="stat"><b>${last ? last[1].toLocaleString() : hs.length && hs[hs.length - 1][1] ? hs[hs.length - 1][1].toLocaleString() : '<span class="na">Not published</span>'}</b>latest awards</div>
            </div>
            ${hs.length ? `
            <table>
                <tr><th>Year</th><th>Awards</th><th>Applications</th><th>Rate</th><th></th></tr>
                ${hs.map(x => `<tr><td>${x[0]}</td><td>${fm(x[1])}</td><td>${fm(x[2])}</td><td>${x[1] && x[2] ? (x[1] / x[2] * 100).toFixed(1) + "%" : "–"}</td><td style="width:60px">${x[1] ? `<div class="bar" style="width:${x[1] / mx * 100}%"></div>` : ""}</td></tr>`).join("")}
            </table>` : '<div class="meta" style="padding:4px 0">Year-by-year numbers: <span class="na">Not published by scholarship body</span></div>'}
            <div class="note" style="margin-top:8px;padding:8px 10px">${s.src || "No official recipient or application statistics found."}</div>
            <div class="detail-actions">
                <a class="btn" href="https://${s.u}" target="_blank" rel="noopener">Official Website ↗</a>
                <button class="btn-export" type="button" onclick="copySingleScholarship(${s.id}, event)">📋 Copy Details</button>
                <button class="btn-view-map" type="button" onclick="handleSwitchToMap(${s.id}, event)">🗺️ View Route on Map</button>
                <button class="btn-close-detail-inline" type="button" onclick="collapseSelected(event)" title="Collapse details">✕ Collapse</button>
            </div>
        </div>`;
}

window.copySingleScholarship = function(id, e) {
    if (e) e.stopPropagation();
    const s = R[id];
    if (!s) return;
    const singleText = `🎓 ${s.name} (${C[s.c][0]})\n` +
        `- Levels: ${[...s.lv].map(x => LV[x]).join(", ")}\n` +
        `- Funding: ${s.f === "F" ? "Fully Funded" : "Partial"} | Award: ${s.aw} (${CUR[s.c] || ""})\n` +
        `- Typical Requirement: ${cg(s.m)}\n` +
        `- Deadline: ${s.dl}\n` +
        `- English: ${s.q[0]}\n` +
        `- Experience: ${s.q[1]}\n` +
        `- Official Link: https://${s.u}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(singleText).then(() => {
            showToast(`✅ Copied "${s.name}" details!`);
        }).catch(() => fallbackCopy(singleText, 1));
    } else {
        fallbackCopy(singleText, 1);
    }
};

window.handleSwitchToMap = function(id, e) {
    if (e) e.stopPropagation();
    setActiveTab("map");
    $("info").scrollIntoView({ behavior: "smooth" });
    fly();
    const s = R[id];
    if (s && s.c) zoomToCountry(s.c, 2.7);
};

window.collapseSelected = function(e) {
    if (e) e.stopPropagation();
    S.sel = null;
    render();
    fly();
};

function prog(s) {
    const lv = [...s.lv].filter(x => !S.l || S.l.length === 0 || S.l.includes(x));
    if (!lv.length) return "";
    const isD = s.name.startsWith("DAAD");
    const body = lv.map(x => {
        if (isD) {
            const it = DP.filter(p => p[3] == x && (!S.d || S.d.length === 0 || p[2] == "*" || S.d.includes(p[2])));
            return `<b>${LV[x]}</b> <small>(${it.length} listed)</small><ul>${it.map(p => `<li>${p[0]}${p[1] ? ` — <small>${p[1]}</small>` : ""} <span class="tag L">${p[2] == "*" ? "All fields" : DOM[p[2]]}</span></li>`).join("") || "<li><small>No listed course for this field at this level.</small></li>"}</ul>`;
        }
        return `<b>${LV[x]}</b><ul><li>${(PL[s.name] || {})[x] || "Programmes vary by host institution — see the official programme list."}</li></ul>`;
    }).join("");
    const fl = fieldsOf(s) == "*" ? "All fields (some host programmes may be restricted)" : [...fieldsOf(s)].map(k => DOM[k]).join(", ");
    return `<div class="prg"><b>📚 Available programmes by level</b><br><small>Eligible fields: ${fl}</small>${body}${isD ? '<br><small>EPOS courses need 2+ yrs work experience and developing-country citizenship; apply directly to the course (up to 3). Partial list — see daad.de/epos.</small>' : ""}</div>`;
}

function detail() {
    if ($("det")) $("det").innerHTML = "";
    const s = S.sel !== null ? R[S.sel] : null;
    if (!s) {
        $("info").innerHTML = `
                    <div class="route-hint">
                        <span>✈️ Click any scholarship or destination to see flight route & distance</span>
                    </div>`;
        return;
    }

    // Update flight & distance info card in left pane
    const a = C[S.o], b = C[s.c], d = km(a, b);
    $("info").innerHTML = `
                <div class="route-info-item">
                    <b>${Math.round(d).toLocaleString()} km</b>
                    <small>${Math.round(d * .621).toLocaleString()} miles</small>
                </div>
                <div class="route-info-item">
                    <b>~${(d / 850 + .7).toFixed(1)} hrs</b>
                    <small>Flight time (approx)</small>
                </div>
                <div class="route-info-item">
                    <b>${a[0]} ✈️ ${b[0]}</b>
                    <small>${a[3]} → ${b[3]}</small>
                </div>`;
}

// Shortlist Export Functionality
function exportShortlist() {
    const currentList = list();
    if (!currentList.length) {
        showToast("⚠️ No scholarships currently match your filters to export.");
        return;
    }

    const title = S.viewSaved ? "Saved Scholarship Shortlist" : "Available Scholarships Shortlist";
    let text = `# 🎓 ${title} (${currentList.length} Opportunities)\n`;
    text += `Generated via Scholaro.xyz — Your Future. Your Scholarship. | Origin: ${C[S.o][0]} | Date: ${new Date().toLocaleDateString()}\n\n`;

    currentList.forEach((s, idx) => {
        text += `### ${idx + 1}. ${s.name}\n`;
        text += `- **Destination:** ${C[s.c][0]} (${C[s.c][3]})\n`;
        text += `- **Degree Levels:** ${[...s.lv].map(x => LV[x]).join(", ")}\n`;
        text += `- **Funding Type:** ${s.f === "F" ? "Fully Funded" : "Partial"}\n`;
        text += `- **Award / Stipend:** ${s.aw} (${CUR[s.c] || ""})\n`;
        text += `- **Typical CGPA:** ${cg(s.m)}\n`;
        text += `- **Deadline:** ${s.dl}\n`;
        text += `- **English Test:** ${s.q[0]}\n`;
        text += `- **Experience:** ${s.q[1]}\n`;
        text += `- **Official Portal:** https://${s.u}\n\n`;
    });

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`✅ Copied ${currentList.length} scholarships to clipboard!`);
        }).catch(() => fallbackCopy(text, currentList.length));
    } else {
        fallbackCopy(text, currentList.length);
    }
}

function fallbackCopy(text, count) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand("copy");
        showToast(`✅ Copied ${count} item(s) to clipboard!`);
    } catch (err) {
        showToast(`❌ Copy failed. Please select text manually.`);
    }
    ta.remove();
}

function showToast(msg) {
    const existing = document.querySelector(".toast-notice");
    if (existing) existing.remove();
    const t = document.createElement("div");
    t.className = "toast-notice";
    t.innerHTML = msg;
    document.body.appendChild(t);
    setTimeout(() => {
        t.style.opacity = "0";
        t.style.transform = "translateY(10px)";
        t.style.transition = "all 0.25s ease";
        setTimeout(() => t.remove(), 260);
    }, 2800);
}

// ---- 2D World Map (D3 + TopoJSON) ----
let proj, path, svg, feats, pr = 1;
let currentViewBox = { x: 0, y: 0, w: 1000, h: 480 };
let zoomAnimFrame = null;
let lastZoomedCountry = null;
let isMapZoomedIn = false;

function animateViewBox(tx, ty, tw, th, duration = 650) {
    if (!svg) return;
    if (zoomAnimFrame) cancelAnimationFrame(zoomAnimFrame);

    const startX = currentViewBox.x;
    const startY = currentViewBox.y;
    const startW = currentViewBox.w;
    const startH = currentViewBox.h;
    const startTime = performance.now();

    const resetBtn = $("btnResetMapZoom");
    const isZoomed = Math.abs(tw - 1000) > 10 || Math.abs(th - 480) > 10;
    if (resetBtn) {
        resetBtn.style.display = isZoomed ? "inline-flex" : "none";
    }

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const ease = easeInOutCubic(progress);

        currentViewBox.x = startX + (tx - startX) * ease;
        currentViewBox.y = startY + (ty - startY) * ease;
        currentViewBox.w = startW + (tw - startW) * ease;
        currentViewBox.h = startH + (th - startH) * ease;

        svg.attr("viewBox", `${currentViewBox.x} ${currentViewBox.y} ${currentViewBox.w} ${currentViewBox.h}`);

        if (progress < 1) {
            zoomAnimFrame = requestAnimationFrame(step);
        } else {
            currentViewBox.x = tx;
            currentViewBox.y = ty;
            currentViewBox.w = tw;
            currentViewBox.h = th;
            svg.attr("viewBox", `${tx} ${ty} ${tw} ${th}`);
            zoomAnimFrame = null;
        }
    }

    zoomAnimFrame = requestAnimationFrame(step);
}

function zoomToCountry(countryCode, zoomLevel = 2.7) {
    if (!countryCode || !C[countryCode] || !proj) return;
    isMapZoomedIn = true;
    const p = proj(pt(countryCode));
    const w = 1000 / zoomLevel;
    const h = 480 / zoomLevel;
    const x = Math.max(0, Math.min(1000 - w, p[0] - w / 2));
    const y = Math.max(0, Math.min(480 - h, p[1] - h / 2));
    animateViewBox(x, y, w, h, 650);
    draw();
}

function resetMapZoom(duration = 550) {
    isMapZoomedIn = false;
    animateViewBox(0, 0, 1000, 480, duration);
    draw();
}

function checkMapZoom() {
    if (S.sel !== null && R[S.sel]) {
        const destCountry = R[S.sel].c;
        if (destCountry !== lastZoomedCountry) {
            lastZoomedCountry = destCountry;
            zoomToCountry(destCountry, 2.7);
        }
    } else if (S.dst && S.dst.length === 1) {
        const destCountry = S.dst[0];
        if (destCountry !== lastZoomedCountry) {
            lastZoomedCountry = destCountry;
            zoomToCountry(destCountry, 2.7);
        }
    } else {
        if (lastZoomedCountry !== null) {
            lastZoomedCountry = null;
            resetMapZoom();
        }
    }
}

function initMap() {
    if (typeof d3 === "undefined" || typeof Datamap === "undefined") {
        $("map").outerHTML = '<div style="color:#fff;padding:30px;text-align:center">Map library loading... (check connection)</div>';
        return false;
    }
    try {
        const T = Datamap.prototype.worldTopo;
        feats = topojson.feature(T, T.objects.world).features.filter(f => f.id != "ATA");
        proj = d3.geo.equirectangular().scale(159).translate([500, 262]).precision(.1);
        path = d3.geo.path().projection(proj);
        svg = d3.select("#map").attr("viewBox", "0 0 1000 480").attr("preserveAspectRatio", "xMidYMid meet");
        currentViewBox = { x: 0, y: 0, w: 1000, h: 480 };

        const resetBtn = $("btnResetMapZoom");
        if (resetBtn) {
            resetBtn.onclick = () => {
                isMapZoomedIn = false;
                lastZoomedCountry = null;
                resetMapZoom(550);
                draw();
            };
        }

        return true;
    } catch (err) {
        console.error("Map initialization error:", err);
        return false;
    }
}

const pt = k => [C[k][2], C[k][1]];
function arcPts(a, b, p) {
    const i = d3.geo.interpolate(a, b);
    const n = Math.max(2, Math.round(80 * p));
    return d3.range(n + 1).map(j => i(j / n * p));
}

function draw() {
    if (!svg) return;
    const o = C[S.o][4];
    const sel = S.sel !== null ? C[R[S.sel].c][4] : (S.dst && S.dst.length === 1 ? C[S.dst[0]][4] : null);
    const activeDestCountry = S.sel !== null && R[S.sel] ? R[S.sel].c : (S.dst && S.dst.length === 1 ? S.dst[0] : null);
    const isZoomed = isMapZoomedIn && Boolean(activeDestCountry);
    const isDark = document.documentElement.getAttribute("data-theme") !== "light";

    const oceanBg = isDark ? "#081735" : "#e2ecfa";
    const landBg = isDark ? "#384c73" : "#94a3b8";
    const landStroke = isDark ? "#0f1c34" : "#64748b";
    const graticuleStroke = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)";
    const legendBg = isDark ? "rgba(8, 23, 53, 0.85)" : "rgba(255, 255, 255, 0.9)";
    const legendBorder = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.12)";
    const legendText = isDark ? "#e2e8f0" : "#1e293b";

    let h = `<rect width="1000" height="480" fill="${oceanBg}"/>
                     <path d="${path(d3.geo.graticule()())}" fill="none" stroke="${graticuleStroke}" stroke-width=".6"/>`;

    feats.forEach(f => {
        const isDstSelected = S.dst && S.dst.length > 0 && S.dst.some(dc => C[dc] && C[dc][4] === f.id);
        const c = f.id == o ? "#16a34a" : (f.id == sel || isDstSelected) ? "#f59e0b" : landBg;
        h += `<path d="${path(f) || ""}" fill="${c}" stroke="${landStroke}" stroke-width=".6"/>`;
    });

    const cnt = {};
    list().forEach(s => cnt[s.c] = (cnt[s.c] || 0) + 1);

    Object.keys(cnt).forEach(k => {
        // When zoomed in, only show the destination location and hide rest of scholarship count suggestions (1, 2, 3...)
        if (isZoomed && k !== activeDestCountry) return;

        const p = proj(pt(k));
        const on = (sel && C[k][4] == sel) || (S.dst && S.dst.includes(k));
        if (on) {
            h += `<circle cx="${p[0]}" cy="${p[1]}" r="20" fill="none" stroke="#f59e0b" stroke-width="2.5" opacity="0.75"><animate attributeName="r" values="12;24;12" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.9;0.15;0.9" dur="2s" repeatCount="indefinite"/></circle>`;
        }
        h += `<circle cx="${p[0]}" cy="${p[1]}" r="${on ? 12 : 9}" fill="${on ? "#f59e0b" : "#2563eb"}" stroke="#ffffff" stroke-width="2" style="cursor:pointer" onclick="handleMapCountryClick('${k}')"/><text x="${p[0]}" y="${p[1] + 3.5}" font-size="10.5" fill="${on ? "#0f172a" : "#ffffff"}" text-anchor="middle" font-weight="800" pointer-events="none">${cnt[k]}</text>`;
    });

    const oll = pt(S.o);
    const op = proj(oll);
    h += `<circle cx="${op[0]}" cy="${op[1]}" r="7" fill="#16a34a" stroke="#ffffff" stroke-width="2"/><text x="${op[0] + 10}" y="${op[1] - 9}" font-size="13" font-weight="800" fill="#ffffff" stroke="#000000" stroke-width=".8" paint-order="stroke">${C[S.o][0]}</text>`;

    if (sel || (S.dst && S.dst.length === 1)) {
        const dc = S.sel !== null ? R[S.sel].c : S.dst[0];
        if (dc && C[dc]) {
            const t = pt(dc);
            const pts = arcPts(oll, t, pr);
            h += `<path d="${path({ type: "LineString", coordinates: pts })}" fill="none" stroke="#fbbf24" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="1 0"/>`;
            const e = proj(pts[pts.length - 1]);
            h += `<text x="${e[0] - 10}" y="${e[1] + 6}" font-size="20">✈️</text>`;
            const tp = proj(t);
            h += `<text x="${tp[0] + 12}" y="${tp[1] + 16}" font-size="13" font-weight="800" fill="#ffffff" stroke="#000000" stroke-width=".8" paint-order="stroke">${C[dc][0]}</text>`;

            if (pr >= 1) {
                const m = proj(arcPts(oll, t, .5).pop());
                const d = Math.round(km(C[S.o], C[dc]));
                h += `<rect x="${m[0] - 46}" y="${m[1] - 30}" width="92" height="22" rx="11" fill="#f59e0b"/><text x="${m[0]}" y="${m[1] - 15}" font-size="12" font-weight="800" text-anchor="middle" fill="#0f172a">${d.toLocaleString()} km</text>`;
            }
        }
    }

    if (!isZoomed) {
        h += `<g font-size="11" font-weight="600" fill="${legendText}">
                    <rect x="10" y="445" width="280" height="26" rx="6" fill="${legendBg}" stroke="${legendBorder}" stroke-width="1"/>
                    <rect x="20" y="452" width="12" height="12" rx="2" fill="#16a34a"/>
                    <text x="38" y="462">Origin</text>
                    <rect x="95" y="452" width="12" height="12" rx="2" fill="#f59e0b"/>
                    <text x="113" y="462">Destination</text>
                    <circle cx="202" cy="458" r="6" fill="#2563eb" stroke="#fff" stroke-width="1.2"/>
                    <text x="214" y="462">Scholarships</text>
                  </g>`;
    }
    svg.html(h);
}

window.handleMapCountryClick = function (countryCode) {
    if (C[countryCode]) {
        if (!Array.isArray(S.dst)) S.dst = [];
        const idx = S.dst.indexOf(countryCode);
        if (idx > -1) {
            S.dst.splice(idx, 1);
        } else {
            S.dst.push(countryCode);
        }
        const matches = list();
        if (matches.length > 0) {
            S.sel = matches[0].id;
        } else {
            S.sel = null;
        }
        render();
        fly();
    }
};

function fly() {
    if (S.sel === null && (!S.dst || S.dst.length === 0)) {
        draw();
        return;
    }
    pr = 0;
    const t0 = Date.now();
    d3.timer(() => {
        const t = Math.min(1, (Date.now() - t0) / 2200);
        pr = t;
        draw();
        return t >= 1;
    });
}

// Mobile Tab Switcher Handler
function setActiveTab(tab) {
    $("app").setAttribute("data-active-tab", tab);
    if (tab === "map") {
        $("tabMap").classList.add("active");
        $("tabList").classList.remove("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        $("tabList").classList.add("active");
        $("tabMap").classList.remove("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

$("tabMap").onclick = () => setActiveTab("map");
$("tabList").onclick = () => setActiveTab("list");

// Theme Toggle Handler
const themeBtn = $("themeToggle");
function initTheme() {
    const savedTheme = localStorage.getItem("wse_theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    if (themeBtn) {
        themeBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
        themeBtn.setAttribute("title", `Switch to ${savedTheme === "dark" ? "light" : "dark"} mode`);
    }
}

if (themeBtn) {
    themeBtn.onclick = () => {
        const cur = document.documentElement.getAttribute("data-theme") || "light";
        const next = cur === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("wse_theme", next);
        themeBtn.textContent = next === "dark" ? "☀️" : "🌙";
        themeBtn.setAttribute("title", `Switch to ${next === "dark" ? "light" : "dark"} mode`);
        if (typeof draw === "function") draw();
    };
}

// Fallback copy function for browsers/contexts without navigator.clipboard
function fallbackCopy(text, label) {
    try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.top = "-9999px";
        ta.style.left = "-9999px";
        ta.setAttribute("readonly", "");
        document.body.appendChild(ta);
        ta.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(ta);
        if (successful) {
            showToast(`✅ Copied ${label}: ${text}`);
        } else {
            prompt(`Copy this ${label}:`, text);
        }
    } catch (e) {
        prompt(`Copy this ${label}:`, text);
    }
}

// Copy Payment Details for Buy Me a Tamarind Tea
window.copyPayment = function (number, method) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(number).then(() => {
            showToast(`✅ Copied ${method} number: ${number}`);
        }).catch(() => fallbackCopy(number, method));
    } else {
        fallbackCopy(number, method);
    }
};
// Real Live Visitor Counter for Scholaro.xyz
function initVisitorCounter() {
    const counterEl = document.getElementById("visitorCountVal");
    if (!counterEl) return;

    const KEY = "scholaro_xyz_global_visitors";
    const SESSION_FLAG = "scholaro_visited_session";
    const CACHE_KEY = "scholaro_last_visitor_count";

    // 1. Show cached count immediately if available (prevents layout shift / delay)
    const cachedCount = localStorage.getItem(CACHE_KEY);
    if (cachedCount && !isNaN(cachedCount)) {
        counterEl.textContent = Number(cachedCount).toLocaleString();
    }

    // 2. Genuine visit tracking:
    // Only increment once per browser session so refreshing doesn't create fake numbers
    const alreadyVisitedThisSession = sessionStorage.getItem(SESSION_FLAG);
    const action = alreadyVisitedThisSession ? "get" : "hit";
    const apiUrl = `https://countapi.mileshilliard.com/api/v1/${action}/${KEY}`;

    fetch(apiUrl, { cache: "no-store" })
        .then(res => {
            if (!res.ok) throw new Error("API HTTP " + res.status);
            return res.json();
        })
        .then(data => {
            if (data && typeof data.value === "number") {
                const count = data.value;
                counterEl.textContent = count.toLocaleString();
                localStorage.setItem(CACHE_KEY, count);
                if (action === "hit") {
                    sessionStorage.setItem(SESSION_FLAG, "true");
                }
            } else if (cachedCount) {
                counterEl.textContent = Number(cachedCount).toLocaleString();
            }
        })
        .catch(err => {
            console.warn("Visitor counter sync note:", err);
            if (cachedCount) {
                counterEl.textContent = Number(cachedCount).toLocaleString();
            } else {
                counterEl.textContent = "1";
            }
        });
}

initTheme();
initVisitorCounter();
updateScaleTag();
updateFavBadge();
setupDstPicker();
populateDestinations();
if (initMap()) {
    render();
}

// Deep linking support for URL parameters (e.g. ?search=chevening or ?q=fulbright or ?dst=UK or ?org=BD)
try {
    const params = new URLSearchParams(window.location.search);
    const qParam = params.get("search") || params.get("q");
    const dstParam = params.get("dst");
    const orgParam = params.get("org");
    let changed = false;

    if (qParam) {
        S.q = qParam.trim().toLowerCase();
        const searchBox = $("searchInput");
        if (searchBox) searchBox.value = qParam;
        changed = true;
    }
    if (orgParam && C[orgParam.toUpperCase()]) {
        S.o = orgParam.toUpperCase();
        const orgSelect = $("org");
        if (orgSelect) orgSelect.value = S.o;
        changed = true;
    }
    if (dstParam && C[dstParam.toUpperCase()]) {
        S.dst = [dstParam.toUpperCase()];
        changed = true;
    }
    if (changed) {
        render();
        const matching = list();
        if (matching.length > 0) {
            S.sel = matching[0].id;
            detail();
            fly();
        }
    }
} catch (e) {
    console.warn("URL query param parsing note:", e);
}