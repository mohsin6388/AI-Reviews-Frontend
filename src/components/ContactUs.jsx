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
    const whatsappNumber = "918750200899";

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
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconWrap}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div>
            <h2 style={styles.heading}>Contact Us</h2>
            <p style={styles.subheading}>We'll reply within 24 hours</p>
          </div>
        </div>

        <div style={styles.divider} />

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Name + Email side by side */}
          <div style={styles.row}>
            <div style={styles.fieldWrap}>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.fieldWrap}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          </div>

          {/* Phone */}
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="+91 9XX543XXX"
              value={formData.phone}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          {/* Message */}
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Message</label>
            <textarea
              name="message"
              placeholder="How can we help you?"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              style={styles.textarea}
            />
          </div>

          <button type="submit" style={styles.button}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    padding: "20px 16px",
  },

  card: {
    width: "100%",
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
    border: "1px solid #e5e7eb",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },

  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: "10px",
    background: "#eff6ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  heading: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 2px",
  },

  subheading: {
    fontSize: "12px",
    color: "#9ca3af",
    margin: 0,
  },

  divider: {
    height: "1px",
    background: "#f1f5f9",
    marginBottom: "16px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  row: {
    display: "flex",
    gap: "12px",
  },

  fieldWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    flex: 1,
  },

  label: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#374151",
  },

  input: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    fontSize: "13px",
    outline: "none",
    color: "#111827",
    background: "#fafafa",
    width: "100%",
    boxSizing: "border-box",
  },

  textarea: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    fontSize: "13px",
    outline: "none",
    resize: "none",
    color: "#111827",
    background: "#fafafa",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },

  button: {
    padding: "11px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "4px",
  },
};

export default ContactUs;
