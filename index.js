const AWS = require("aws-sdk");

const translate = new AWS.Translate({
  accessKeyId: "XXXXXXXX",
  secretAccessKey: "XXXXXXX",
  region: "us-xxxx-x",
});

const languages = [
  "fr",
  "ar",
  "zh",
  "de",
  "it",
  "pt",
  "ru",
  "uk",
  "hi",
  "fi",
  "el",
  "hu",
  "id",
  "ms",
  "sv",
  "th",
  "tr",
  "vi",
  "ko",
  "ja",
  "bg",
  "pl",
  "no",
];

const userPost = {
  _id: "dDGbSZvdNyL4jf2HK",
  title: "My Post!",
  content: "I went fishing today and let me tell you, those fish were nothing to play with!",
};

const translateCall = async (data) => {
  const params = {
    SourceLanguageCode: "auto",
    TargetLanguageCode: data.lang,
    Text: data.text,
  };

  try {
    const translationData = await translate.translateText(params).promise();
    return translationData;
  } catch (e) {
    console.log(e);
  }
};

const translatePosts = async () => {
  for (let i = 0; i < languages.length; i++) {
    const userTitleParams = {
      lang: languages[i],
      text: userPost.title,
    };
    const userContentParams = {
      lang: languages[i],
      text: userPost.content,
    };

    const translatedTitle = await translateCall(userTitleParams);
    const translatedContent = await translateCall(userContentParams);

    const data = {
      lang: languages[i],
      title: translatedTitle.TranslatedText,
      content: translatedContent.TranslatedText,
    };

    DB.update({ _id: userPost._id }, { $push: { translations: data } });
  }
};

translatePosts();
