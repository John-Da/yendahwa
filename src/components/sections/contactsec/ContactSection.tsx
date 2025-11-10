import "../../../index.css";
import "./ContactSection.css";

function ContactSection() {
  return (
    <div className="contact-container" id="contact">
      <div className="contact-header">
        <h1>Contact Me</h1>
        <hr />
      </div>

      <div className="contact-content">
        <div className="contact-sendmsg">
          <h2>Message Me</h2>
          <form action="/">
            <div className="form-grid">
              <div className="input-box">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="input-box">
                <input type="email" placeholder="Your Email" required />
              </div>
            </div>
            <div className="input-box full">
              <textarea placeholder="Your Message" required></textarea>
            </div>

            <button type="submit" className="contact-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
