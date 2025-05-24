import wixData from "wix-data";
import { fetch } from "wix-fetch";

$w.onReady(function () {
  $w("#button1").onClick(async () => {
    let formData = {
      firstName: $w("#input11").value,
      lastName: $w("#input12").value,
      email: $w("#input13").value,
    };

    // Зберігаємо в колекцію Wix
    await wixData
      .insert("formUser", formData)
      .then(() => {
        console.log("Дані збережено в колекції Wix");
      })
      .catch((err) => {
        console.log("Помилка збереження в Wix:", err);
      });

    // Відправляємо дані в Google Sheets через вебхук
    const googleWebhookUrl =
      "https://script.google.com/macros/s/AKfycbySIe66_VgY6ZZzOavGERM1JQttmE4KlGkSc684wsKn1_v8AtTTaADat3_dEojr498teA/exec";
    await fetch(googleWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      mode: "no-cors",
    })
      .then(() => {
        console.log("Дані відправлено в Google Sheets (режим no-cors)");
        $w("#input11").value = "";
        $w("#input12").value = "";
        $w("#input13").value = "";
      })
      .catch((err) => {
        console.log("Помилка відправки в Google Sheets:", err);
      });
  });
});
