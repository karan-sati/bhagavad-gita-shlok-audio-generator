export interface WordMeaning {
  word: string;
  meaning: string;
}

export interface Shloka {
  id: string;
  chapter: number;
  verse: number;
  chapterName: string;
  chapterNameSanskrit: string;
  sanskrit: string;
  sanskritLines: string[];
  transliteration: string;
  transliterationLines: string[];
  wordMeanings: WordMeaning[];
  translationEn: string;
  translationHi: string;
  purport: string;
  moodTag: 'Duty & Action' | 'Inner Peace' | 'Overcoming Fear' | 'Mind Control' | 'Devotion' | 'Wisdom & Knowledge' | 'Grief & Loss';
  durationSec: number;
}

export interface ChapterInfo {
  chapterNumber: number;
  nameEn: string;
  nameSanskrit: string;
  meaning: string;
  versesCount: number;
  summaryEn: string;
  summaryHi: string;
  keyTheme: string;
}

export const GITA_CHAPTERS: ChapterInfo[] = [
  {
    chapterNumber: 1,
    nameEn: "Arjuna Vishada Yoga",
    nameSanskrit: "अर्जुनविषादयोग",
    meaning: "The Yoga of Arjuna's Despondency",
    versesCount: 47,
    summaryEn: "Arjuna inspects the opposing armies on the holy battlefield of Kurukshetra and is overwhelmed by sorrow and moral crisis.",
    summaryHi: "कुरुक्षेत्र के पवित्र रणक्षेत्र में अर्जुन दोनों सेनाओं का निरीक्षण करते हैं और शोक एवं मोह से व्याकुल हो जाते हैं।",
    keyTheme: "Moral Dilemma & Emotional Crisis"
  },
  {
    chapterNumber: 2,
    nameEn: "Sankhya Yoga",
    nameSanskrit: "सांख्ययोग",
    meaning: "The Yoga of Analytical Knowledge",
    versesCount: 72,
    summaryEn: "Sri Krishna reveals the immortality of the soul, the principle of selfless duty (Nishkama Karma), and the state of the enlightened sage (Sthitaprajna).",
    summaryHi: "श्रीकृष्ण आत्मा की अमरता, निष्काम कर्मयोग का दिव्य रहस्य और स्थितप्रज्ञ मुनि के लक्षण समझाते हैं।",
    keyTheme: "Soul Immortality & Selfless Action"
  },
  {
    chapterNumber: 3,
    nameEn: "Karma Yoga",
    nameSanskrit: "कर्मयोग",
    meaning: "The Yoga of Action",
    versesCount: 43,
    summaryEn: "Teaching on how action performed without selfish attachment leads to spiritual freedom and maintains the harmony of the world.",
    summaryHi: "बिना किसी स्वार्थ और फल की कामना के कर्तव्य कर्म करने से मनुष्य आत्म-शुद्धि और मोक्ष प्राप्त करता है।",
    keyTheme: "Selfless Duty & Right Living"
  },
  {
    chapterNumber: 4,
    nameEn: "Jnana Karma Sanyasa Yoga",
    nameSanskrit: "ज्ञानकर्मसंन्यासयोग",
    meaning: "The Yoga of Knowledge and the Discipline of Action",
    versesCount: 42,
    summaryEn: "Krishna reveals His divine incarnations, the ancient lineage of spiritual wisdom, and the fire of knowledge that burns away all karmic reactions.",
    summaryHi: "भगवान अपने अवतारों का रहस्य, प्राचीन ज्ञान परम्परा और ज्ञान की अग्नि से कर्मों के भस्म होने का उपदेश देते हैं।",
    keyTheme: "Divine Descent & Sacred Knowledge"
  },
  {
    chapterNumber: 5,
    nameEn: "Karma Sanyasa Yoga",
    nameSanskrit: "कर्मसंन्यासयोग",
    meaning: "The Yoga of Renunciation of Action",
    versesCount: 29,
    summaryEn: "Reconciliation of renunciation and selfless action; explaining that performing duties while mentally surrendering all fruits brings supreme serenity.",
    summaryHi: "संन्यास और निष्काम कर्म दोनों एक ही लक्ष्य तक पहुँचाते हैं; कर्मफलों को परमात्मा को समर्पित कर शांति मिलती है।",
    keyTheme: "True Renunciation & Equanimity"
  },
  {
    chapterNumber: 6,
    nameEn: "Dhyana Yoga",
    nameSanskrit: "ध्यानयोग",
    meaning: "The Yoga of Meditation",
    versesCount: 47,
    summaryEn: "The discipline of mastering the restless mind through constant practice and dispassion, sitting posture, and meditation on the Supreme Self.",
    summaryHi: "चंचल मन को अभ्यास और वैराग्य से नियंत्रित करने तथा परमात्मा के ध्यान में स्थित होने की विधि।",
    keyTheme: "Mind Mastery & Meditation"
  },
  {
    chapterNumber: 7,
    nameEn: "Jnana Vijnana Yoga",
    nameSanskrit: "ज्ञानविज्ञानयोग",
    meaning: "The Yoga of Knowledge and Realization",
    versesCount: 30,
    summaryEn: "Krishna explains His manifest and unmanifest energies, the four types of devotees, and the divine illusion (Maya) difficult to transcend.",
    summaryHi: "भगवान अपनी अपरा और परा प्रकृति का वर्णन करते हैं तथा चार प्रकार के भक्तों का महत्व बताते हैं।",
    keyTheme: "Ultimate Truth & Maya"
  },
  {
    chapterNumber: 8,
    nameEn: "Aksara Brahma Yoga",
    nameSanskrit: "अक्षरब्रह्मयोग",
    meaning: "The Yoga of the Imperishable Brahman",
    versesCount: 28,
    summaryEn: "The path of attaining liberation by remembering the Supreme Divine at the moment of departing this mortal body.",
    summaryHi: "अन्तकाल में भगवान का स्मरण करते हुए प्राण त्यागने से परम धाम की प्राप्ति का उपदेश।",
    keyTheme: "Liberation & Eternal Remembrance"
  },
  {
    chapterNumber: 9,
    nameEn: "Raja Vidya Guhya Yoga",
    nameSanskrit: "राजविद्याराजगुह्ययोग",
    meaning: "The Yoga of the Sovereign Science and Secret",
    versesCount: 34,
    summaryEn: "The supreme mystery of devotion; Krishna's promise to personally preserve what His loving devotees need and protect what they have.",
    summaryHi: "परम गोपनीय ज्ञान; जो अनन्य भाव से भगवान का भजन करते हैं, उनके योगक्षेम का वहन स्वयं भगवान करते हैं।",
    keyTheme: "Divine Grace & Pure Devotion"
  },
  {
    chapterNumber: 10,
    nameEn: "Vibhuti Yoga",
    nameSanskrit: "विभूतियोग",
    meaning: "The Yoga of Divine Splendors",
    versesCount: 42,
    summaryEn: "Krishna reveals His divine manifestations throughout creation: among lights He is the Sun, among senses the Mind, among mountains Meru.",
    summaryHi: "सम्पूर्ण ब्रह्मांड में परमात्मा के दिव्य ऐश्वर्य और विभूतियों का भव्य दर्शन।",
    keyTheme: "Omnipresence of the Divine"
  },
  {
    chapterNumber: 11,
    nameEn: "Vishwarupa Darshana Yoga",
    nameSanskrit: "विश्वरूपदर्शनयोग",
    meaning: "The Yoga of the Vision of the Cosmic Form",
    versesCount: 55,
    summaryEn: "Arjuna receives the divine eye and beholds Krishna's terrifying and awe-inspiring universal form containing all worlds, time, and destinies.",
    summaryHi: "अर्जुन को दिव्य दृष्टि प्राप्त होती है और वे भगवान के अनंत, तेजस्वी विश्वरूप का साक्षात दर्शन करते हैं।",
    keyTheme: "Cosmic Revelation & Time as the Destroyer"
  },
  {
    chapterNumber: 12,
    nameEn: "Bhakti Yoga",
    nameSanskrit: "भक्तियोग",
    meaning: "The Yoga of Devotion",
    versesCount: 20,
    summaryEn: "The glorious pathway of pure devotional love and the tranquil qualities of a devotee who is supremely dear to God.",
    summaryHi: "अनन्य प्रेम और भक्ति का सरल मार्ग तथा परमात्मा को अति प्रिय भक्तों के करुणामय लक्षण।",
    keyTheme: "Surrender & Loving Devotion"
  },
  {
    chapterNumber: 13,
    nameEn: "Kshetra Kshetrajna Vibhaga Yoga",
    nameSanskrit: "क्षेत्रक्षेत्रज्ञविभागयोग",
    meaning: "The Yoga of Distinction Between Field and Knower",
    versesCount: 35,
    summaryEn: "Analysis of the human body and material nature as the 'Field', and the conscious Soul/Supersoul as the eternal 'Knower'.",
    summaryHi: "शरीर को 'क्षेत्र' और उसमें रहने वाली आत्मा को 'क्षेत्रज्ञ' समझकर विवेक जागृत करने का ज्ञान।",
    keyTheme: "Consciousness & Nature"
  },
  {
    chapterNumber: 14,
    nameEn: "Gunatraya Vibhaga Yoga",
    nameSanskrit: "गुणत्रयविभागयोग",
    meaning: "The Yoga of the Three Modes of Material Nature",
    versesCount: 27,
    summaryEn: "How the three gunas—Sattva (goodness), Rajas (passion), and Tamas (ignorance)—bind the soul and how to transcend them.",
    summaryHi: "सत्त्व, रज और तम—इन तीनों गुणों का प्रभाव और गुणातीत होकर अमृतमय पद पाने का मार्ग।",
    keyTheme: "Transcending the 3 Gunas"
  },
  {
    chapterNumber: 15,
    nameEn: "Purushottama Yoga",
    nameSanskrit: "पुरुषोत्तमयोग",
    meaning: "The Yoga of the Supreme Person",
    versesCount: 20,
    summaryEn: "The metaphor of the inverted cosmic Ashvattha banyan tree and the nature of the Supreme Divine beyond the perishable and imperishable.",
    summaryHi: "उल्टे संसार रूपी अश्वत्थ वृक्ष को वैराग्य के शस्त्र से काटकर पुरुषोत्तम भगवान को प्राप्त करने का उपदेश।",
    keyTheme: "The Supreme Cosmic Source"
  },
  {
    chapterNumber: 16,
    nameEn: "Daivasura Sampad Vibhaga Yoga",
    nameSanskrit: "दैवासुरसम्पद्विभागयोग",
    meaning: "The Yoga of Divine and Demonic Natures",
    versesCount: 24,
    summaryEn: "Contrasting the 26 divine virtues (fearlessness, purity, charity, non-violence) with the self-destructive tendencies (lust, anger, greed).",
    summaryHi: "दैवी सम्पदा (अभय, सत्य, अहिंसा) और आसुरी प्रवृत्तियों (काम, क्रोध, लोभ) का विशद वर्णन।",
    keyTheme: "Virtue vs Degradation"
  },
  {
    chapterNumber: 17,
    nameEn: "Shraddhatraya Vibhaga Yoga",
    nameSanskrit: "श्रद्धात्रयविभागयोग",
    meaning: "The Yoga of the Three Divisions of Faith",
    versesCount: 28,
    summaryEn: "The three qualities of faith, food, sacrifice, austerity, and charity, and the sacred purifying utterance 'Om Tat Sat'.",
    summaryHi: "मनुष्य के स्वभाव के अनुसार श्रद्धा, आहार, तप और दान के तीन रूप और 'ॐ तत् सत्' का महत्व।",
    keyTheme: "Purity of Faith & Lifestyle"
  },
  {
    chapterNumber: 18,
    nameEn: "Moksha Sanyasa Yoga",
    nameSanskrit: "मोक्षसंन्यासयोग",
    meaning: "The Yoga of Liberation through Renunciation",
    versesCount: 78,
    summaryEn: "The supreme culmination of the Gita: the perfection of renunciation, duty as worship, and the ultimate promise of unconditional surrender.",
    summaryHi: "गीता का परम निष्कर्ष: मोक्ष संन्यास योग, स्वधर्म का पालन और अंत में 'सर्वधर्मान्परित्यज्य' का महा-मंत्र।",
    keyTheme: "Ultimate Surrender & Supreme Liberation"
  }
];

export const GITA_SHLOKAS: Shloka[] = [
  {
    id: "BG_2_47",
    chapter: 2,
    verse: 47,
    chapterName: "Sankhya Yoga",
    chapterNameSanskrit: "सांख्ययोग",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    sanskritLines: [
      "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
      "मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥"
    ],
    transliteration: "karmaṇy-evādhikāras te mā phaleṣhu kadāchana\nmā karma-phala-hetur bhūr mā te saṅgo 'stvakarmaṇi",
    transliterationLines: [
      "karmaṇy-evādhikāras te mā phaleṣhu kadāchana",
      "mā karma-phala-hetur bhūr mā te saṅgo 'stvakarmaṇi"
    ],
    wordMeanings: [
      { word: "karmaṇi", meaning: "in prescribed work / action" },
      { word: "eva", meaning: "only / certainly" },
      { word: "adhikāraḥ", meaning: "right / entitlement" },
      { word: "te", meaning: "your" },
      { word: "mā", meaning: "never / not" },
      { word: "phaleṣu", meaning: "in the fruits / results" },
      { word: "kadācana", meaning: "at any time" },
      { word: "mā karma-phala-hetuḥ", meaning: "never consider yourself cause of fruits" },
      { word: "bhūḥ", meaning: "become" },
      { word: "te", meaning: "your" },
      { word: "saṅgaḥ", meaning: "attachment" },
      { word: "astu", meaning: "be" },
      { word: "akarmaṇi", meaning: "in inaction / negligence" }
    ],
    translationEn: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to inaction.",
    translationHi: "तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए कर्म के फल की इच्छा मत करो और न ही कर्म न करने में तुम्हारी आसक्ति हो।",
    purport: "This iconic shloka defines Nishkama Karma—the foundation of stress-free living. When you focus 100% on the quality of your effort rather than anxious anticipation of future outcomes, your intellect remains calm, clarity reigns, and your work achieves its highest potential.",
    moodTag: "Duty & Action",
    durationSec: 16
  },
  {
    id: "BG_4_7",
    chapter: 4,
    verse: 7,
    chapterName: "Jnana Karma Sanyasa Yoga",
    chapterNameSanskrit: "ज्ञानकर्मसंन्यासयोग",
    sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
    sanskritLines: [
      "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।",
      "अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥"
    ],
    transliteration: "yadā yadā hi dharmasya glānir bhavati bhārata\nabhyutthānam adharmasya tadātmānaṁ sṛijāmyaham",
    transliterationLines: [
      "yadā yadā hi dharmasya glānir bhavati bhārata",
      "abhyutthānam adharmasya tadātmānaṁ sṛijāmyaham"
    ],
    wordMeanings: [
      { word: "yadā yadā", meaning: "whenever and wherever" },
      { word: "hi", meaning: "certainly" },
      { word: "dharmasya", meaning: "of righteousness / virtue" },
      { word: "glāniḥ", meaning: "decline / decay" },
      { word: "bhavati", meaning: "happens / arises" },
      { word: "bhārata", meaning: "O descendant of Bharata (Arjuna)" },
      { word: "abhyutthānam", meaning: "ascendance / rise" },
      { word: "adharmasya", meaning: "of unrighteousness" },
      { word: "tadā", meaning: "at that time" },
      { word: "ātmānam", meaning: "Myself" },
      { word: "sṛjāmi", meaning: "manifest / embody" },
      { word: "aham", meaning: "I" }
    ],
    translationEn: "Whenever and wherever there is a decline in righteousness, O descendant of Bharata, and a predominant rise of unrighteousness—at that time I manifest Myself on earth.",
    translationHi: "हे भारत! जब-जब धर्म की हानि और अधर्म की वृद्धि होती है, तब-तब मैं अपने रूप को रचता हूँ अर्थात साकार रूप से प्रकट होता हूँ।",
    purport: "The Lord assures humanity that cosmic order is self-correcting. When tyranny, confusion, and darkness seem overwhelmingly dominant, divine grace manifests to restore equilibrium and protect pure souls.",
    moodTag: "Overcoming Fear",
    durationSec: 15
  },
  {
    id: "BG_4_8",
    chapter: 4,
    verse: 8,
    chapterName: "Jnana Karma Sanyasa Yoga",
    chapterNameSanskrit: "ज्ञानकर्मसंन्यासयोग",
    sanskrit: "परित्राणाय साधूनां विनाशाय च दुष्कृताम्।\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥",
    sanskritLines: [
      "परित्राणाय साधूनां विनाशाय च दुष्कृताम्।",
      "धर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥"
    ],
    transliteration: "paritrāṇāya sādhūnāṁ vināśhāya cha duṣhkṛitām\ndharma-saṁsthāpanārthāya sambhavāmi yuge yuge",
    transliterationLines: [
      "paritrāṇāya sādhūnāṁ vināśhāya cha duṣhkṛitām",
      "dharma-saṁsthāpanārthāya sambhavāmi yuge yuge"
    ],
    wordMeanings: [
      { word: "paritrāṇāya", meaning: "for the deliverance / protection" },
      { word: "sādhūnām", meaning: "of the virtuous and noble" },
      { word: "vināśāya", meaning: "for the annihilation" },
      { word: "ca", meaning: "and" },
      { word: "duṣkṛtām", meaning: "of the wicked / evil-doers" },
      { word: "dharma-saṁsthāpana-arthāya", meaning: "to re-establish principles of righteousness" },
      { word: "sambhavāmi", meaning: "I appear" },
      { word: "yuge yuge", meaning: "millennium after millennium / age after age" }
    ],
    translationEn: "To protect the righteous, to annihilate the miscreants, and to re-establish the principles of righteousness, I appear age after age.",
    translationHi: "साधु पुरुषों के उद्धार के लिए, पापकर्म करने वालों के विनाश के लिए और धर्म की भली-भांति स्थापना के लिए मैं युग-युग में प्रकट होता हूँ।",
    purport: "Righteousness (Dharma) is not a temporary human construct but the bedrock of existence. Even in times of darkness, goodness will always prevail.",
    moodTag: "Motivation & Strength" as any,
    durationSec: 15
  },
  {
    id: "BG_2_14",
    chapter: 2,
    verse: 14,
    chapterName: "Sankhya Yoga",
    chapterNameSanskrit: "सांख्ययोग",
    sanskrit: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥",
    sanskritLines: [
      "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।",
      "आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥"
    ],
    transliteration: "mātrā-sparśhās tu kaunteya śhītoṣhṇa-sukha-duḥkha-dāḥ\nāgamāpāyino 'nityās tans titikṣhasva bhārata",
    transliterationLines: [
      "mātrā-sparśhās tu kaunteya śhītoṣhṇa-sukha-duḥkha-dāḥ",
      "āgamāpāyino 'nityās tans titikṣhasva bhārata"
    ],
    wordMeanings: [
      { word: "mātrā-sparśāḥ", meaning: "contact of the senses with their objects" },
      { word: "tu", meaning: "indeed" },
      { word: "kaunteya", meaning: "O son of Kunti (Arjuna)" },
      { word: "śīta-uṣṇa", meaning: "winter and summer / cold and heat" },
      { word: "sukha-duḥkha-dāḥ", meaning: "giving joy and sorrow" },
      { word: "āgama-apāyinaḥ", meaning: "fleeting, coming and going" },
      { word: "anityāḥ", meaning: "impermanent" },
      { word: "tān", meaning: "them" },
      { word: "titikṣasva", meaning: "bear / tolerate with patience" },
      { word: "bhārata", meaning: "O Bharata" }
    ],
    translationEn: "O son of Kunti, the fleeting perception of happiness and distress, and their disappearance in due course, are like the appearance and disappearance of winter and summer seasons. They arise from sense perception, and one must learn to tolerate them without being disturbed.",
    translationHi: "हे कुन्तीपुत्र! सर्दी-गर्मी और सुख-दुःख को देने वाले इन्द्रिय और विषयों के संयोग तो उत्पत्ति और विनाशशील तथा अनित्य हैं, इसलिए हे भारत! तुम उनको सहन करो।",
    purport: "Just as heat follows cold and sunny skies follow torrential rains, outer circumstances continuously shift. Titiksha (spiritual forbearance) grants emotional immunity against transient life turbulence.",
    moodTag: "Inner Peace",
    durationSec: 17
  },
  {
    id: "BG_2_20",
    chapter: 2,
    verse: 20,
    chapterName: "Sankhya Yoga",
    chapterNameSanskrit: "सांख्ययोग",
    sanskrit: "न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥",
    sanskritLines: [
      "न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः।",
      "अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥"
    ],
    transliteration: "na jāyate mriyate vā kadāchin\nnāyaṁ bhūtvā bhavitā vā na bhūyaḥ\najo nityaḥ śhāśhvato 'yaṁ purāṇo\nna hanyate hanyamāne śharīre",
    transliterationLines: [
      "na jāyate mriyate vā kadāchin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ",
      "ajo nityaḥ śhāśhvato 'yaṁ purāṇo na hanyate hanyamāne śharīre"
    ],
    wordMeanings: [
      { word: "na", meaning: "neither" },
      { word: "jāyate", meaning: "is born" },
      { word: "mriyate", meaning: "dies" },
      { word: "vā", meaning: "or" },
      { word: "kadācit", meaning: "at any time" },
      { word: "ajaḥ", meaning: "unborn" },
      { word: "nityaḥ", meaning: "eternal" },
      { word: "śāśvataḥ", meaning: "everlasting" },
      { word: "purāṇaḥ", meaning: "primeval / ancient" },
      { word: "na hanyate", meaning: "is not killed" },
      { word: "hanyamāne", meaning: "when killed" },
      { word: "śarīre", meaning: "the physical body" }
    ],
    translationEn: "The soul is neither born, nor does it ever die; nor having once existed, does it ever cease to be. The soul is unborn, eternal, immortal, and timeless. It is not slain when the body is slain.",
    translationHi: "यह आत्मा न कभी जन्म लेती है और न कभी मरती ही है; न यह उत्पन्न होकर फिर नष्ट होती है। यह अजन्मा, नित्य, शाश्वत और पुरातन है; शरीर के मारे जाने पर भी यह नहीं मारी जाती।",
    purport: "The greatest antidote to the fear of death and grief. You are not a transient biological vessel; you are pure, conscious, indestructible spirit experiencing material realms.",
    moodTag: "Grief & Loss",
    durationSec: 18
  },
  {
    id: "BG_2_22",
    chapter: 2,
    verse: 22,
    chapterName: "Sankhya Yoga",
    chapterNameSanskrit: "सांख्ययोग",
    sanskrit: "वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि।\nतथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही॥",
    sanskritLines: [
      "वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि।",
      "तथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही॥"
    ],
    transliteration: "vāsāṁsi jīrṇāni yathā vihāya\nnavāni gṛihṇāti naro 'parāṇi\ntathā śharīrāṇi vihāya jīrṇāny\nanyāni saṁyāti navāni dehī",
    transliterationLines: [
      "vāsāṁsi jīrṇāni yathā vihāya navāni gṛihṇāti naro 'parāṇi",
      "tathā śharīrāṇi vihāya jīrṇāny anyāni saṁyāti navāni dehī"
    ],
    wordMeanings: [
      { word: "vāsāṁsi", meaning: "garments / clothes" },
      { word: "jīrṇāni", meaning: "worn out / old" },
      { word: "yathā", meaning: "just as" },
      { word: "vihāya", meaning: "discarding" },
      { word: "navāni", meaning: "new ones" },
      { word: "gṛhṇāti", meaning: "accepts" },
      { word: "naraḥ", meaning: "a human" },
      { word: "tathā", meaning: "similarly" },
      { word: "śarīrāṇi", meaning: "bodies" },
      { word: "dehī", meaning: "the embodied soul" }
    ],
    translationEn: "Just as a person discards worn-out garments and puts on new ones, the embodied soul casts off worn-out bodies and enters into others that are new.",
    translationHi: "जैसे मनुष्य पुराने वस्त्रों को त्यागकर दूसरे नए वस्त्र धारण कर लेता है, वैसे ही जीवात्मा पुराने शरीरों को त्यागकर दूसरे नए शरीरों को प्राप्त होती है।",
    purport: "Change is the cosmic law. Understanding death as merely changing old garments liberates the human heart from paralyzing sorrow and mourning.",
    moodTag: "Grief & Loss",
    durationSec: 17
  },
  {
    id: "BG_6_5",
    chapter: 6,
    verse: 5,
    chapterName: "Dhyana Yoga",
    chapterNameSanskrit: "ध्यानयोग",
    sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
    sanskritLines: [
      "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।",
      "आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥"
    ],
    transliteration: "uddhared ātmanātmānaṁ nātmānam avasādayet\nātmaiva hyātmano bandhur ātmaiva ripur ātmanaḥ",
    transliterationLines: [
      "uddhared ātmanātmānaṁ nātmānam avasādayet",
      "ātmaiva hyātmano bandhur ātmaiva ripur ātmanaḥ"
    ],
    wordMeanings: [
      { word: "uddharet", meaning: "one must elevate / deliver" },
      { word: "ātmanā", meaning: "by one's own mind / self" },
      { word: "ātmānam", meaning: "the self" },
      { word: "na", meaning: "never" },
      { word: "avasādayet", meaning: "degrade / depress" },
      { word: "ātma", meaning: "the mind / self" },
      { word: "eva", meaning: "indeed" },
      { word: "hi", meaning: "surely" },
      { word: "bandhuḥ", meaning: "friend" },
      { word: "ripuḥ", meaning: "enemy" }
    ],
    translationEn: "Elevate yourself through the power of your mind, and do not degrade yourself. For the mind can be the greatest friend of the self, and the mind can also be the greatest enemy.",
    translationHi: "मनुष्य को चाहिए कि वह अपने मन द्वारा अपना उद्धार करे, अपना पतन न होने दे; क्योंकि यह मन ही आत्मा का मित्र है और मन ही आत्मा का शत्रु है।",
    purport: "No one outside can rescue you if your own mind conspires against you. When disciplined, the mind becomes your most loyal champion and ally; uncontrolled, it torments you like a bitter foe.",
    moodTag: "Mind Control",
    durationSec: 16
  },
  {
    id: "BG_6_26",
    chapter: 6,
    verse: 26,
    chapterName: "Dhyana Yoga",
    chapterNameSanskrit: "ध्यानयोग",
    sanskrit: "यतो यतो निश्चरति मनश्चञ्चलमस्थिरम्।\nततस्ततो नियम्यैतदात्मन्येव वशं नयेत्॥",
    sanskritLines: [
      "यतो यतो निश्चरति मनश्चञ्चलमस्थिरम्।",
      "ततस्ततो नियम्यैतदात्मन्येव वशं नयेत्॥"
    ],
    transliteration: "yato yato niśhcharati manaśh chañchalam asthiram\ntatas tato niyamyaitad ātmanyeva vaśhaṁ nayet",
    transliterationLines: [
      "yato yato niśhcharati manaśh chañchalam asthiram",
      "tatas tato niyamyaitad ātmanyeva vaśhaṁ nayet"
    ],
    wordMeanings: [
      { word: "yataḥ yataḥ", meaning: "wherever / from whatever cause" },
      { word: "niścarati", meaning: "wanders away / drifts" },
      { word: "manaḥ", meaning: "the mind" },
      { word: "cañcalam", meaning: "restless / flickering" },
      { word: "asthiram", meaning: "unsteady" },
      { word: "tataḥ tataḥ", meaning: "from there" },
      { word: "niyamya", meaning: "restraining / pulling back" },
      { word: "etat", meaning: "this" },
      { word: "ātmani", meaning: "in the Self" },
      { word: "vaśam nayet", meaning: "bring under control" }
    ],
    translationEn: "From wherever the restless and unsteady mind wanders away, one must repeatedly restrain it and gently bring it back under the control of the Self.",
    translationHi: "यह चंचल और अस्थिर मन जिस-जिस विषय के कारण सांसारिक पदार्थों में भटकता है, उस-उस से इसे रोककर बार-बार आत्मा में ही स्थिर करना चाहिए।",
    purport: "Do not be discouraged when your mind wanders during meditation or work. The art of mastery is not in never wandering, but in patient, compassionate redirecting of attention again and again.",
    moodTag: "Mind Control",
    durationSec: 16
  },
  {
    id: "BG_9_22",
    chapter: 9,
    verse: 22,
    chapterName: "Raja Vidya Guhya Yoga",
    chapterNameSanskrit: "राजविद्याराजगुह्ययोग",
    sanskrit: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥",
    sanskritLines: [
      "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।",
      "तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥"
    ],
    transliteration: "ananyāśh chintayanto māṁ ye janāḥ paryupāsate\nteṣhāṁ nityābhiyuktānāṁ yoga-kṣhemaṁ vahāmyaham",
    transliterationLines: [
      "ananyāśh chintayanto māṁ ye janāḥ paryupāsate",
      "teṣhāṁ nityābhiyuktānāṁ yoga-kṣhemaṁ vahāmyaham"
    ],
    wordMeanings: [
      { word: "ananyāḥ", meaning: "with single-minded devotion" },
      { word: "cintayantaḥ", meaning: "thinking / meditating" },
      { word: "mām", meaning: "on Me" },
      { word: "ye janāḥ", meaning: "those people who" },
      { word: "paryupāsate", meaning: "worship sincerely" },
      { word: "teṣām", meaning: "for them" },
      { word: "nitya-abhiyuktānām", meaning: "who are constantly absorbed in devotion" },
      { word: "yoga", meaning: "providing what they lack" },
      { word: "kṣemam", meaning: "preserving what they have" },
      { word: "vahāmi aham", meaning: "I carry personally" }
    ],
    translationEn: "For those who always think of Me and worship Me with unswerving devotion, I personally provide what they lack and protect what they already possess.",
    translationHi: "जो अनन्य भक्तजन मेरा चिंतन करते हुए निष्काम भाव से मेरी उपासना करते हैं, उन नित्य युक्त मनुष्यों के योगक्षेम (अप्राप्त की प्राप्ति और प्राप्त की रक्षा) का वहन मैं स्वयं करता हूँ।",
    purport: "The sacred promise of Yoga-Kshema. When our devotion to truth, goodness, and the Divine is unwavering, the universe takes over our security and deepest wellbeing.",
    moodTag: "Devotion",
    durationSec: 17
  },
  {
    id: "BG_12_13",
    chapter: 12,
    verse: 13,
    chapterName: "Bhakti Yoga",
    chapterNameSanskrit: "भक्तियोग",
    sanskrit: "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च।\nनिर्ममो निरहङ्कारः समदुःखसुखः क्षमी॥",
    sanskritLines: [
      "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च।",
      "निर्ममो निरहङ्कारः समदुःखसुखः क्षमी॥"
    ],
    transliteration: "adveṣhṭā sarva-bhūtānāṁ maitraḥ karuṇa eva cha\nnirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣhamī",
    transliterationLines: [
      "adveṣhṭā sarva-bhūtānāṁ maitraḥ karuṇa eva cha",
      "nirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣhamī"
    ],
    wordMeanings: [
      { word: "adveṣṭā", meaning: "free from malice / non-hating" },
      { word: "sarva-bhūtānām", meaning: "toward all living beings" },
      { word: "maitraḥ", meaning: "friendly" },
      { word: "karuṇaḥ", meaning: "compassionate" },
      { word: "nirmamaḥ", meaning: "free from possessiveness" },
      { word: "nirahaṅkāraḥ", meaning: "free from egotism / vanity" },
      { word: "sama-duḥkha-sukhaḥ", meaning: "equanimous in joy and grief" },
      { word: "kṣamī", meaning: "forgiving" }
    ],
    translationEn: "One who bears no malice toward any living being, who is friendly and compassionate, free from possessiveness and false ego, equal in sorrow and joy, and forgiving—such a devotee is very dear to Me.",
    translationHi: "जो किसी भी प्राणी से द्वेष नहीं करता, सबका मित्र और दयालु है, ममता और अहंकार से रहित है, सुख-दुःख में समभाव रखने वाला और क्षमाशील है, वह भक्त मुझे अति प्रिय है।",
    purport: "True spirituality is verified by how we treat other beings. Universal friendliness, empathy, absence of pride, and a forgiving heart constitute divine character.",
    moodTag: "Inner Peace",
    durationSec: 16
  },
  {
    id: "BG_18_66",
    chapter: 18,
    verse: 66,
    chapterName: "Moksha Sanyasa Yoga",
    chapterNameSanskrit: "मोक्षसंन्यासयोग",
    sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
    sanskritLines: [
      "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।",
      "अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥"
    ],
    transliteration: "sarva-dharmān parityajya mām ekaṁ śharaṇaṁ vraja\nahaṁ tvāṁ sarva-pāpebhyo mokṣhayiṣhyāmi mā śhuchaḥ",
    transliterationLines: [
      "sarva-dharmān parityajya mām ekaṁ śharaṇaṁ vraja",
      "ahaṁ tvāṁ sarva-pāpebhyo mokṣhayiṣhyāmi mā śhuchaḥ"
    ],
    wordMeanings: [
      { word: "sarva-dharmān", meaning: "all varieties of duties / rules" },
      { word: "parityajya", meaning: "abandoning / renouncing anxiety of" },
      { word: "mām ekam", meaning: "unto Me alone" },
      { word: "śaraṇam vraja", meaning: "take refuge / surrender" },
      { word: "aham", meaning: "I" },
      { word: "tvām", meaning: "you" },
      { word: "sarva-pāpebhyaḥ", meaning: "from all sins and fears" },
      { word: "mokṣayiṣyāmi", meaning: "will liberate / deliver" },
      { word: "mā śucaḥ", meaning: "do not grieve / fear not" }
    ],
    translationEn: "Abandon all varieties of dharmas and simply surrender unto Me alone. I shall deliver you from all sinful reactions and distress; do not despair.",
    translationHi: "सब धर्मों को अर्थात सम्पूर्ण कर्तव्य कर्मों को मुझे समर्पित करके केवल मेरी शरण में आ जाओ। मैं तुम्हें सब पापों से मुक्त कर दूँगा, तुम शोक मत करो।",
    purport: "The Charama Shloka—the crown jewel of the entire Bhagavad Gita. When human intellect reaches its limit and exhausted striving falls silent, unreserved surrender to divine love unlocks supreme liberation and peace.",
    moodTag: "Devotion",
    durationSec: 17
  },
  {
    id: "BG_2_62",
    chapter: 2,
    verse: 62,
    chapterName: "Sankhya Yoga",
    chapterNameSanskrit: "सांख्ययोग",
    sanskrit: "ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते।\nसङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते॥",
    sanskritLines: [
      "ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते।",
      "सङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते॥"
    ],
    transliteration: "dhyāyato viṣhayān puṁsaḥ saṅgas teṣhūpajāyate\nsaṅgāt sañjāyate kāmaḥ kāmāt krodho 'bhijāyate",
    transliterationLines: [
      "dhyāyato viṣhayān puṁsaḥ saṅgas teṣhūpajāyate",
      "saṅgāt sañjāyate kāmaḥ kāmāt krodho 'bhijāyate"
    ],
    wordMeanings: [
      { word: "dhyāyataḥ", meaning: "contemplating / dwelling upon" },
      { word: "viṣayān", meaning: "sense objects" },
      { word: "puṁsaḥ", meaning: "of a person" },
      { word: "saṅgaḥ", meaning: "attachment" },
      { word: "teṣu", meaning: "in them" },
      { word: "upajāyate", meaning: "develops" },
      { word: "saṅgāt", meaning: "from attachment" },
      { word: "sañjāyate", meaning: "arises" },
      { word: "kāmaḥ", meaning: "craving / desire" },
      { word: "kāmāt", meaning: "from unfulfilled desire" },
      { word: "krodhaḥ", meaning: "anger" },
      { word: "abhijāyate", meaning: "arises" }
    ],
    translationEn: "While contemplating the objects of the senses, a person develops attachment for them; from attachment desire develops, and from unfulfilled desire anger arises.",
    translationHi: "विषयों का चिंतन करने वाले मनुष्य की उन विषयों में आसक्ति हो जाती है; आसक्ति से कामना उत्पन्न होती है और कामना में विघ्न पड़ने से क्रोध उत्पन्न होता है।",
    purport: "The psychological ladder of downfall. It begins subtly with continuous contemplation of temptations, which crystallizes into obsessive desire, triggering wrath whenever blocked.",
    moodTag: "Mind Control",
    durationSec: 16
  },
  {
    id: "BG_2_63",
    chapter: 2,
    verse: 63,
    chapterName: "Sankhya Yoga",
    chapterNameSanskrit: "सांख्ययोग",
    sanskrit: "क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः।\nस्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति॥",
    sanskritLines: [
      "क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः।",
      "स्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति॥"
    ],
    transliteration: "krodhād bhavati sammohaḥ sammohāt smṛiti-vibhramaḥ\nsmṛiti-bhraṁśhād buddhi-nāśho buddhi-nāśhāt praṇaśhyati",
    transliterationLines: [
      "krodhād bhavati sammohaḥ sammohāt smṛiti-vibhramaḥ",
      "smṛiti-bhraṁśhād buddhi-nāśho buddhi-nāśhāt praṇaśhyati"
    ],
    wordMeanings: [
      { word: "krodhāt", meaning: "from anger" },
      { word: "bhavati", meaning: "arises" },
      { word: "sammohaḥ", meaning: "delusion / bewilderment" },
      { word: "sammohāt", meaning: "from delusion" },
      { word: "smṛti-vibhramaḥ", meaning: "loss of memory and wisdom" },
      { word: "smṛti-bhraṁśāt", meaning: "from loss of memory" },
      { word: "buddhi-nāśaḥ", meaning: "ruin of intellect / reasoning" },
      { word: "buddhi-nāśāt", meaning: "from ruin of intellect" },
      { word: "praṇaśyati", meaning: "one perishes / is destroyed" }
    ],
    translationEn: "From anger arises delusion; from delusion comes loss of memory; from loss of memory comes ruin of the intellect, and from the ruin of the intellect, a person is utterly ruined.",
    translationHi: "क्रोध से मूढ़भाव उत्पन्न होता है, मूढ़भाव से स्मृति भ्रमित हो जाती है; स्मृति भ्रम से बुद्धि का नाश होता है और बुद्धि नष्ट होने से मनुष्य का पतन हो जाता है।",
    purport: "The culmination of psychological degradation. A single moment of blinded rage obliterates hard-earned values, leading to self-destructive choices.",
    moodTag: "Mind Control",
    durationSec: 16
  },
  {
    id: "BG_3_21",
    chapter: 3,
    verse: 21,
    chapterName: "Karma Yoga",
    chapterNameSanskrit: "कर्मयोग",
    sanskrit: "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः।\nस यत्प्रमाणं कुरुते लोकस्तदनुवर्तते॥",
    sanskritLines: [
      "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः।",
      "स यत्प्रमाणं कुरुते लोकस्तदनुवर्तते॥"
    ],
    transliteration: "yad yad ācharati śhreṣhṭhas tat tad evetaro janaḥ\nsa yat pramāṇaṁ kurute lokas tad anuvartate",
    transliterationLines: [
      "yad yad ācharati śhreṣhṭhas tat tad evetaro janaḥ",
      "sa yat pramāṇaṁ kurute lokas tad anuvartate"
    ],
    wordMeanings: [
      { word: "yad yad", meaning: "whatever" },
      { word: "ācarati", meaning: "acts / practices" },
      { word: "śreṣṭhaḥ", meaning: "a noble leader / respected person" },
      { word: "tat tat", meaning: "that alone" },
      { word: "eva", meaning: "indeed" },
      { word: "itaraḥ janaḥ", meaning: "ordinary people" },
      { word: "saḥ", meaning: "they" },
      { word: "yat", meaning: "which" },
      { word: "pramāṇam", meaning: "standard / benchmark" },
      { word: "kurute", meaning: "sets" },
      { word: "lokaḥ", meaning: "the entire world" },
      { word: "tat anuvartate", meaning: "follows that" }
    ],
    translationEn: "Whatever action a great leader performs, common men follow. Whatever standards they set by exemplary acts, all the world pursues.",
    translationHi: "श्रेष्ठ पुरुष जो-जो आचरण करता है, अन्य लोग भी वैसा ही आचरण करते हैं; वह जो प्रमाण निश्चित कर देता है, सारा संसार उसी का अनुगमन करता है।",
    purport: "Leadership by personal integrity. Preaching words means nothing; living virtuous, selfless, accountable actions inspires thousands to uplift their lives.",
    moodTag: "Duty & Action",
    durationSec: 15
  }
];

export interface LifeGuidanceTheme {
  id: string;
  title: string;
  sanskritTitle: string;
  icon: string;
  description: string;
  suggestedShlokas: string[];
}

export const LIFE_GUIDANCE_THEMES: LifeGuidanceTheme[] = [
  {
    id: "anxiety-fear",
    title: "Overcoming Anxiety & Fear",
    sanskritTitle: "अभय एवं शान्ति",
    icon: "ShieldAlert",
    description: "When fear of failure, disease, or the unknown paralyzes your spirit.",
    suggestedShlokas: ["BG_2_14", "BG_4_7", "BG_2_20"]
  },
  {
    id: "duty-procrastination",
    title: "Duty, Action & Overthinking",
    sanskritTitle: "कर्म एवं कर्तव्य",
    icon: "Briefcase",
    description: "When you are stuck in analysis paralysis or fear of outcome.",
    suggestedShlokas: ["BG_2_47", "BG_3_21"]
  },
  {
    id: "mind-control-focus",
    title: "Mind Mastery & Restlessness",
    sanskritTitle: "चित्त एकाग्रता",
    icon: "Brain",
    description: "When the mind wanders, gets distracted, or craves impulsively.",
    suggestedShlokas: ["BG_6_5", "BG_6_26", "BG_2_62", "BG_2_63"]
  },
  {
    id: "grief-loss",
    title: "Dealing with Grief & Loss",
    sanskritTitle: "शोक निवारण",
    icon: "HeartHandshake",
    description: "When dealing with separation, loss of a loved one, or sudden heartbreak.",
    suggestedShlokas: ["BG_2_20", "BG_2_22", "BG_2_14"]
  },
  {
    id: "surrender-peace",
    title: "Surrender & Inner Serenity",
    sanskritTitle: "शरण एवं समर्पण",
    icon: "Flame",
    description: "When you need deep solace, divine protection, and emotional release.",
    suggestedShlokas: ["BG_9_22", "BG_18_66", "BG_12_13"]
  }
];
