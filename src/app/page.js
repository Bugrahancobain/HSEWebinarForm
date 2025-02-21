"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    ib_ap_al: "",
    testResults: "",
    research: "",
    projects: "",
    internships: "",
    competitions: "",
    volunteerWork: "",
    certifications: "",
    hobbies: "",
    additional: "",
  });

  const [warnings, setWarnings] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const lowerValue = value.trim().toLowerCase();
    if (["evet", "hayır", "hayir"].includes(lowerValue)) {
      setWarnings((prev) => ({ ...prev, [name]: true }));
    } else {
      setWarnings((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Form gönderimi başladı

    try {
      const response = await fetch("/api/saveToGoogleSheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Sunucu hatası: ${response.status}, ${errorData.error}`);
      }

      const data = await response.json();
      alert("Form başarıyla gönderildi!");
    } catch (error) {
      alert(`Form gönderilirken hata oluştu: ${error.message}`);
      console.error("Hata detayı:", error);
    }

    setIsSubmitting(false); // Form gönderimi bitti

    setFormData({
      name: "",
      school: "",
      ib_ap_al: "",
      testResults: "",
      research: "",
      projects: "",
      internships: "",
      competitions: "",
      volunteerWork: "",
      certifications: "",
      hobbies: "",
      additional: "",
    });
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title">HSEDanışmanlık Bilgi Formu</h1>
        <img className="logo" src="/HSELogo.png" alt="HSELogo" />
        <div className="form-group">
          <label>Adınız ve Soyadınız:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Hangi okulda ve hangi sınıftasınız?</label>
          <input type="text" name="school" value={formData.school} onChange={handleChange} required />
        </div>

        {[
          { name: "ib_ap_al", label: "IB, AP veya A-Level gibi programlardan ders aldınız mı? Hangi dersler?" },
          { name: "testResults", label: "IELTS, TOEFL veya Duolingo gibi sınavlardan aldığınız sonuçlar nelerdir?" },
          { name: "research", label: "Hangi alanda akademik araştırma yaptınız? Kısaca açıklayın." },
          { name: "projects", label: "Yer aldığınız projeleri anlatınız." },
          { name: "internships", label: "Staj deneyimlerinizi kısaca anlatınız." },
          { name: "competitions", label: "Katıldığınız ulusal veya uluslararası yarışmaları belirtiniz." },
          { name: "volunteerWork", label: "Gönüllü çalışmalarda hangi alanlarda bulundunuz?" },
          { name: "certifications", label: "Aldığınız sertifikalı dersleri açıklayınız." },
          { name: "hobbies", label: "İlgilendiğiniz spor veya sanat dallarını belirtiniz." },
          { name: "additional", label: "Bunun dışında belirtmek istediğiniz akademik/sosyal çalışmaları açıklayınız." },
        ].map((field) => (
          <div className="form-group" key={field.name}>
            <label>{field.label}</label>{warnings[field.name] && <p style={{ color: "red" }}>🌼 Daha Açıklayıcı Yazarsanız Seviniriz. 🌼</p>}
            <textarea name={field.name} value={formData[field.name]} onChange={handleChange}></textarea>

          </div>
        ))}
        <button className="form-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Form gönderiliyor..." : "Gönder"}
        </button>
      </form>
    </div>
  );
}

