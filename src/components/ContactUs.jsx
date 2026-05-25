import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, message } = formData;

    // Apna WhatsApp number yaha daalo with country code
    const whatsappNumber = "919999999999";

    const text = `
Hello,

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
    `;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      text,
    )}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Contact Us</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            style={styles.textarea}
          />

          <button type="submit" style={styles.button}>
            Send Us
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fb",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "700px",
    background: "#fff",
    borderRadius: "20px",
    padding: "35px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "32px",
    fontWeight: "700",
    color: "#111827",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    outline: "none",
  },

  textarea: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    outline: "none",
    resize: "none",
  },

  button: {
    padding: "15px",
    border: "none",
    borderRadius: "12px",
    background: "#2563EB",
    color: "#fff",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default ContactUs;
