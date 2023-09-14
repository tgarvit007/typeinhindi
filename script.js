const passage = document.getElementById("passage");
const userInput = document.getElementById("userInput");
const timer = document.getElementById("timer");
const accuracy = document.getElementById("accuracy");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopbutton");

let startTime;
let typingTimer;
let words;
let typingStarted = false; 
userInput.disabled = true;
startButton.addEventListener("click", () => {
  startTypingTest();
});

userInput.addEventListener("input", () => {
  if (typingStarted) {
    checkAccuracy();
  } else {
    userInput.value = ""; 
  }
});
function startTypingTest() {
  clearInterval(typingTimer);
  const hindiPassage =
    "सभापति महोदय, प्रतिदिन छोटी मोटी झड़पें होती रहती हैं। हमारी फौजें बड़े उत्साह से उनके मुकाबले में खड़ी हैं, उनके हौसले बहुत ऊंचे हैं लेकिन हमारी सरकार का भी यह कत्र्तव्य है कि उनके हौसले को कभी गिरने न दे। उन्हें हर तरह की सुविधा प्रदान की जाए, जिससे उनका आत्मविश्वास बढ़े। मैं मंत्री महोदय से अनुरोध करूंगा कि सरकार अपनी नीतियों के प्रचार का काम ठीक प्रकार से अपनी फौजों से करें, उनको अच्छे-अच्छे हथियार दे। अनुसूचित जातियों और आदिवासी जातियों के आयुक्त ने जो अपना प्रतिवेदन प्रस्तुत किया है, उस प्रतिवेदन को देखने से यह प्रतीत होता है कि इसको तैयार करने में उन्होंने बहुत परिश्रम से कार्य किया है। इसके लिए मैं उनको और उनके सहयोगियों को धन्यवाद देता हूं परंतु साथ ही साथ इस प्रतिवेदन के संबंध में कुछ आवश्यक निवेदन भी करना चाहता हूं। पहली बात तो यह है कि इस प्रतिवेदन को देखने से ऐसा प्रतीत होता है कि इन कार्यों के लिए जिस धन का उपयोग होता है, वह तीन साधनों से उपलबब्ध होता है। केंद्र सरकार द्वारा, राज्य सरकारों द्वारा और कुछ गैर-सरकारी संस्थाओं द्वारा। प्रतिवेदन के अनुसार जितना धन इन कार्यों पर व्यय करने के लिए दिया जाता है, उतना धन पूरी तरह से व्यय नहीं हो पाता। मैं यह नहीं कह सकता कि आवश्यकता से अधिक धन दिया जाता है या कार्यकत्र्ताओं को वह धन प्राप्त ही नहीं होता, जिसके कारण से वह बिना खर्च हुए बच जाता हैं मैं तो यह चाहता हूं कि जितना धन दिया जाता है उसका पूरा उपयोग हो और आयुक्त को यह न कहना पड़े कि इस कार्य के लिए जितने धन की आवश्यकता थी, उतना धन नहीं मिल पाया और विवश होकर हमको उस कार्य को बीच में ही रोकना पड़ा। जहां तक राज्य सरकारों का संबंध है, बहुत-सी राज्य सरकारें अभी तक इस कार्य में असावधानी से काम ले रही हैं और इस कार्य को उपेक्षा की दृष्टि से देखती हैं। आयुक्त ने इस बात की शिकायत की है कि बहुत-सी राज्य सरकारों ने अनेक पत्र भेजने के बाद भी अभी तक अपनी रिपोर्ट नहीं भेजी है। मैं चाहता हूं कि सरकार इस तरफ निष्ठापूर्वक ध्यान दे, राज्य सरकारों पर दबाव डाला जाए कि वे इस दायित्व के प्रति सचेत हों और आयुक्त को उनके कार्य में पूरा-पूरा सहयोग प्रदान करें।";
  words = hindiPassage.split(" ");
  passage.innerHTML = words.map((word) => `<span>${word}</span>`).join(" ");
  userInput.value = "";
  userInput.focus();

  typingTimer = setInterval(updateTimer, 1000);
  startButton.disabled = true;

  userInput.disabled = false;
  startTime = Date.now();
  typingStarted = true;
}

function updateTimer() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  timer.textContent = `Time: ${elapsedTime}s`;
}

function checkAccuracy() {
  const typedText = userInput.value.trim();
  const typedWords = typedText.split(" ");

  let correctWords = 0;
  let passageHTML = "";

  for (let i = 0; i < words.length; i++) {
    if (typedWords[i] === words[i]) {
      correctWords++;
      passageHTML += `<span class="correct-word">${words[i]}</span> `;
    } else {
      passageHTML += `<span class="missed-word">${words[i]}</span> `;
    }
  }

  const acc = (correctWords / words.length) * 100;
  passage.innerHTML = passageHTML;
  accuracy.textContent = `Accuracy: ${acc.toFixed(2)}%`;
}
stopButton.addEventListener("click", () => {
  stopTypingTest();
});

function stopTypingTest() {
  clearInterval(typingTimer);
  userInput.disabled = true;
  startButton.disabled = false;
  typingStarted = false;
}
