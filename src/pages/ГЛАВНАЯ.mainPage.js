import wixData from "wix-data";
import { fetch } from "wix-fetch";

$w.onReady(function () {
  $w("#button1").onClick(async () => {
    let formData = {
      firstName: $w("#input11").value,
      lastName: $w("#input12").value,
      email: $w("#input13").value,
    };

    // Сохраняем в коллекцию Wix
    await wixData
      .insert("formUser", formData)
      .then(() => {
        console.log("Данные сохранены в коллекции Wix");
      })
      .catch((err) => {
        console.log("Ошибка сохранения в Wix:", err);
      });

    // Отправляем данные в Google Sheets через вебхук
    const googleWebhookUrl =
      "https://script.google.com/macros/s/AKfycbySIe66_VgY6ZZzOavGERM1JQttmE4KlGkSc684wsKn1_v8AtTTaADat3_dEojr498teA/exec"; // Замени на URL из Apps Script
    await fetch(googleWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Данные отправлены в Google Sheets:", data);
        $w("#input11").value = "";
        $w("#input12").value = "";
        $w("#input13").value = "";
      })
      .catch((err) => {
        console.log("Ошибка отправки в Google Sheets:", err);
      });
  });
});
