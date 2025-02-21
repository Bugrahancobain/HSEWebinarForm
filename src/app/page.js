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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

        <div className="form-group">
          <label>IB, AP veya A-Level gibi programlardan ders aldınız mı?</label>
          <input type="text" name="ib_ap_al" value={formData.ib_ap_al} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>IELTS, TOEFL veya Duolingo gibi sınavlardan herhangi bir sonuç aldınız mı?</label>
          <input type="text" name="testResults" value={formData.testResults} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Herhangi bir alanda akademik araştırma yaptınız mı?</label>
          <input type="text" name="research" value={formData.research} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Herhangi bir projede yer aldınız mı?</label>
          <input type="text" name="projects" value={formData.projects} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Herhangi bir staj deneyiminiz oldu mu?</label>
          <input type="text" name="internships" value={formData.internships} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Ulusal veya uluslararası herhangi bir yarışmaya katıldınız mı?</label>
          <input type="text" name="competitions" value={formData.competitions} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Gönüllü çalışmalarda bulundunuz mu?</label>
          <input type="text" name="volunteerWork" value={formData.volunteerWork} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Herhangi bir alanda sertifikalı ders aldınız mı?</label>
          <input type="text" name="certifications" value={formData.certifications} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>İlgilendiğiniz spor veya sanat dalları var mı?</label>
          <input type="text" name="hobbies" value={formData.hobbies} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Bunun dışında belirtmek istediğiniz herhangi bir akademik / sosyal çalışma var mı?</label>
          <textarea name="additional" value={formData.additional} onChange={handleChange}></textarea>
        </div>

        <button className="form-button" type="submit">
          Gönder
        </button>
      </form>
    </div>
  );
}