// briddle.js
// বাংলা ধাঁধা (Standalone Version)
// No dependency, No extra config — 100% working reply system
// Author: Helal

const riddles = [
  { q: "একলা তারা যায় না দেখা, সঙ্গী গেলে বাঁচে। আধার দেখে ভয়ে পালায়, আলোয় ফিরে আসে।", a: "ছায়া" },
  { q: "কোথায় নদী আছে, কিন্তু জল নেই? পাহাড় আছে, কিন্তু পাথর নেই?", a: "মানচিত্র" },
  { q: "যত বাড়াও তত ছোট হয় — কী সেটা?", a: "গর্ত" },
  { q: "আমার মুখ আছে, কিন্তু কথা বলতে পারি না — আমি কে?", a: "নদী" },
  { q: "আমি পা ছাড়াই হাঁটি, মুখ ছাড়াই কথা বলি — আমি কে?", a: "হাওয়া" },
  { q: "বল কোন জিনিসটা যত টানবে তত ছোট হবে?", a: "ব্যান্ড" },
  { q: "আমার পা নেই কিন্তু হাঁটি, ডানা নেই কিন্তু উড়ি, বল কে?", a: "সময়" },
  { q: "যে বাড়ি থেকে বেরোলে ভিজে যাও, কিন্তু ভিতরে শুকনো থাকো?", a: "ছাতা" },
  { q: "বল কোন জিনিসটা কাটলে কাঁদে?", a: "পেঁয়াজ" },
  { q: "যে গাছের পাতা নেই, ছায়া নেই, তবুও মাথায় থাকে?", a: "ছাতা" },
  { q: "যে জিনিসটা যত নেয়া যায়, তত বাড়ে?", a: "গর্ত" },
  { q: "যে মানুষ কখনও ঘুমায় না?", a: "ঘড়ি" },
  { q: "যে জিনিস সবসময় চলে, কিন্তু কখনও থামে না?", a: "সময়" },
  { q: "যে জিনিসের মাথা আছে, কিন্তু শরীর নেই?", a: "পেরেক" },
  { q: "যে জিনিসের মুখ আছে, কিন্তু খায় না?", a: "নদী" },
  { q: "যে জিনিসটি কাটলে কাঁদে, কিন্তু মানুষ নয়?", a: "পেঁয়াজ" },
  { q: "আমি পানি ছুঁলে হারিয়ে যাই — আমি কে?", a: "লবণ" },
  { q: "আমি যত বড় হই, তত হালকা হই — আমি কে?", a: "বেলুন" },
  { q: "যে জিনিসটি চোখে দেখা যায় না, তবুও সবাই অনুভব করে?", a: "হাওয়া" },
  { q: "যে জিনিসটি যত দেয়া যায়, তত বাড়ে?", a: "ভালোবাসা" },
  { q: "যে জিনিসটি ভাঙলে শব্দ হয়, কিন্তু শরীর নয়?", a: "নীরবতা" },
  { q: "যে জিনিসটি যত পরিষ্কার হবে, তত নোংরা দেখাবে?", a: "আয়না" },
  { q: "যে জিনিসটি দৌড়ায় কিন্তু কখনও হাঁটে না?", a: "নদী" },
  { q: "যে জিনিসটি সবসময় সামনে যায় কিন্তু কখনও পেছায় না?", a: "সময়" },
  { q: "যে জিনিসটি দেখলে ভয় পাও, কিন্তু নেই?", a: "ছায়া" },
  { q: "যে জিনিসটি কথা না বলেও অনেক কিছু বলে?", a: "চোখ" },
  { q: "যে জিনিসটি ভাঙলে সুখ পাওয়া যায়?", a: "ডিম" },
  { q: "যে জিনিসটি দেখা যায় না কিন্তু শোনা যায়?", a: "হাওয়া" },
  { q: "যে জিনিসটি যত বাড়ে, তত অন্ধকার হয়?", a: "রাত" },
  { q: "যে জিনিসটি একবার গেলে আর ফিরে আসে না?", a: "সময়" }
];

// store riddles in memory
const activeRiddles = new Map();

module.exports = {
  config: {
    name: "riddle",
    aliases: ["banglariddle", "bhriddle"],
    version: "5.0",
    author: "Helal",
    countDown: 3,
    role: 0,
    category: "game",
    shortDescription: { en: "Bangla riddles — fully standalone reply system" }
  },

  onStart: async function ({ message }) {
    const item = riddles[Math.floor(Math.random() * riddles.length)];
    const text = `🧩 *বাংলা ধাঁধা সময়!*\n\n🇧🇩 প্রশ্ন: ${item.q}\n\n👉 উত্তর দিতে এই মেসেজের রিপ্লাই করো।`;

    message.reply(text, (err, info) => {
      if (err) return;
      activeRiddles.set(info.messageID, {
        answer: item.a.toLowerCase(),
        time: Date.now()
      });
    });
  },

  onChat: async function ({ event, message }) {
    try {
      const replied = event.messageReply;
      if (!replied) return;
      const data = activeRiddles.get(replied.messageID);
      if (!data) return;

      const userAns = (event.body || "").trim().toLowerCase();
      if (!userAns) return;

      if (
        userAns === data.answer ||
        data.answer.includes(userAns) ||
        userAns.includes(data.answer)
      ) {
        message.reply(`✅ ঠিক বলেছো! উত্তর: *${data.answer}* 🎉`);
      } else {
        message.reply(`❌ ভুল বলেছো!\nসঠিক উত্তর → *${data.answer}* 🧠`);
      }

      activeRiddles.delete(replied.messageID);
    } catch (e) {
      console.error(e);
    }
  }
};