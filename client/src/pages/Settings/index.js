import React, { useState } from "react";

const Settings = () => {
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(50);
  const [options, setOptions] = useState({
    lights: false,
    sounds: false,
    parentalMode: false,
  });
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleOptionChange = (e) => {
    setOptions({
      ...options,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div className="flex-column pt-[50px] pl-[50px] pr-[50px] h-screen">
      {/* Left Half */}
      <div className="block w-full p-6 bg-brown rounded-[30px] shadow-[0px_4px_15px_rgba(0,0,0,0.5)]">
        <h5 className="text-9xl font-bold text-[#FBF6E3]">SETTINGS</h5>
      </div>
      <div className="flex mt-10 gap-5">
        <div className="w-1/2 p-12 border-4 border-brown rounded-[30px] bg-lightblue">
          {/* Volume Slider */}
          <div className="mb-16">
            <label className="block text-4xl font-bold mb-2">Volume</label>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="w-full mt-6"
            />
            <p className="mt-2 text-2xl">Current Volume: {volume}%</p>
          </div>

          {/* Brightness Slider */}
          <div className="mb-16">
            <label className="block text-4xl font-bold mb-2">Brightness</label>
            <input
              type="range"
              min="0"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(e.target.value)}
              className="w-full mt-6"
            />
            <p className="mt-2 text-2xl">Current Brightness: {brightness}%</p>
          </div>

          {/* Checkboxes */}
          <div className="mb-16">
            <label className="block text-4xl font-bold mb-4">Options</label>
            <div className="flex flex-col space-y-2 mt-6">
              {["lights", "sounds", "parentalMode"].map((option) => (
                <label className="inline-flex items-center" key={option}>
                  <input
                    type="checkbox"
                    name={option}
                    checked={options[option]}
                    onChange={handleOptionChange}
                    className="custom-checkbox"
                    style={{ transform: "scale(2.5)", marginRight: "20px" }}
                  />
                  <span className="text-2xl">
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Day and Time Dropdown */}
          <div className="mb-16">
            <label className="block text-4xl font-bold mb-2">
              Select Day and Time
            </label>
            <div className="flex space-x-4 mt-6 text-2xl">
              {/* Day Dropdown */}
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="form-select"
                style={{
                  height: "50px",
                  width: "250px",
                  fontSize: "25px",
                  padding: "10px",
                  borderRadius: "15px",
                }}
              >
                <option value="">Select Day</option>
                {[
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>

              {/* Time Dropdown */}
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="form-select"
                style={{
                  height: "50px",
                  width: "250px",
                  fontSize: "25px",
                  padding: "10px",
                  borderRadius: "15px",
                }}
              >
                <option value="">Select Time</option>
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={`${i}:00`}>{`${i}:00`}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="w-1/2 p-12 border-4 border-brown rounded-[30px] bg-lightblue flex flex-col justify-between">
          <div className="mt-5">
            <p className="text-4xl font-bold mb-14">Background (On Standby)</p>
            <div className="space-y-6">
              <div
                className="border-[3px] border-brown bg-base rounded-3xl p-4 text-center text-2xl cursor-pointer h-96 flex items-center justify-center"
                onClick={() => {}}
              >
                Current Background
              </div>
              <div
                className="bg-brown text-white font-bold rounded-2xl p-4 text-2xl text-center cursor-pointer h-16 flex items-center justify-center"
                onClick={() => {}}
              >
                Add a New Background Image
              </div>
            </div>
          </div>

          <p className="text-4xl font-bold mb-5 mt-8">User Agreements</p>
          <div className="flex-row mb-10">
            <button
              onClick={() => setShowTermsModal(true)}
              className="bg-pink text-white font-bold py-3 px-8 rounded-2xl text-lg mr-4"
            >
              Terms and Services
            </button>
            <button
              onClick={() => setShowPrivacyModal(true)}
              className="bg-pink text-white font-bold py-3 px-8 rounded-2xl text-lg"
            >
              Privacy Policy
            </button>
          </div>

          <div className="flex justify-center space-x-4 mt-4">
            <button className="bg-blue text-white font-bold py-4 px-12 rounded-2xl text-2xl">
              Save Settings
            </button>
          </div>
        </div>
      </div>
      {/* Terms and Services Modal Box */}
      {showTermsModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowTermsModal(false)}
        >
          <div
            className="bg-white p-8 rounded shadow-lg max-h-screen overflow-y-auto relative w-11/12 max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowTermsModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" />
                <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">
              Terms and Services
            </h2>
            <p className="text-xl mb-4 text-center">
              Last updated: [15th October 2024]
            </p>
            {/* Terms and Services Content */}
            <p className="mb-4">
              Welcome to [The smart coffee table]. By accessing or using our
              website and services, you agree to be bound by the following terms
              and conditions. Please read these terms carefully before
              proceeding.
            </p>
            <p className="mb-4">
              By using our services, you acknowledge that you have read,
              understood, and accepted all aspects of these terms. If you do not
              agree with any part of these terms, you must not use our website
              or services.
            </p>
            <p className="mb-4">
              We reserve the right to modify or update these terms at any time
              without prior notice. Any changes will be effective immediately
              upon posting on our website. Your continued use of our services
              after any modifications indicates your acceptance of the new
              terms.
            </p>
            <p className="mb-4">
              You are responsible for maintaining the confidentiality of your
              account information, including your username and password. You
              agree to accept responsibility for all activities that occur under
              your account. If you suspect any unauthorized use of your account,
              please notify us immediately.
            </p>
            <p className="mb-4">
              We grant you a limited, non-exclusive, non-transferable license to
              access and use our services for personal, non-commercial purposes.
              You agree not to reproduce, distribute, modify, or create
              derivative works from any content provided on our website without
              our prior written consent.
            </p>
            <p className="mb-4">
              All intellectual property rights in the content, features, and
              functionality of our services are owned by us or our licensors.
              These rights are protected by intellectual property laws and
              treaties. Unauthorized use of any intellectual property may
              violate copyright, trademark, and other laws.
            </p>
            <p className="mb-4">
              Our website may contain links to third-party websites or services
              that are not owned or controlled by us. We are not responsible for
              the content, privacy policies, or practices of any third-party
              sites. Accessing third-party links is at your own risk, and we
              recommend reviewing their terms and policies.
            </p>
            <p className="mb-4">
              We strive to ensure that the information on our website is
              accurate and up-to-date. However, we do not warrant the
              completeness, reliability, or accuracy of any content. The
              services are provided on an "as-is" and "as-available" basis,
              without any warranties of any kind, either express or implied.
            </p>
            <p className="mb-4">
              To the fullest extent permitted by law, we disclaim all
              warranties, including but not limited to implied warranties of
              merchantability, fitness for a particular purpose, and
              non-infringement. We do not guarantee that our services will be
              uninterrupted, secure, or free from errors or viruses.
            </p>
            <p className="mb-4">
              In no event shall we be liable for any direct, indirect,
              incidental, special, consequential, or exemplary damages arising
              from your use of our services or inability to use the services,
              even if we have been advised of the possibility of such damages.
              Your sole remedy is to discontinue use of our services.
            </p>
            <p className="mb-4">
              You agree to indemnify and hold harmless [The smart coffee table
              company], its affiliates, officers, agents, and employees from any
              claims, liabilities, damages, losses, or expenses arising out of
              your use of the services, violation of these terms, or
              infringement of any rights of another party.
            </p>
            <p className="mb-4">
              These terms and your use of our services are governed by and
              construed in accordance with the laws of Australia, without regard
              to its conflict of law principles. Any disputes arising from these
              terms or the services shall be subject to the exclusive
              jurisdiction of the courts in your particular Jurisdiction.
            </p>
            <p className="mb-4">
              If any provision of these terms is found to be invalid or
              unenforceable by a court of competent jurisdiction, the remaining
              provisions shall remain in full force and effect. Our failure to
              enforce any right or provision of these terms will not be deemed a
              waiver of such right or provision.
            </p>
            <p className="mb-4">
              These terms constitute the entire agreement between you and [The
              smart coffee table company] regarding your use of our services and
              supersede any prior agreements or understandings. No oral or
              written information or advice given by us shall create any
              additional warranties or obligations.
            </p>
            <p className="mb-4">
              If you have any questions or concerns about these terms and
              conditions, please contact us at:
            </p>
            <ul className="mb-4 ml-8 list-disc">
              <li>Email: smartcoffeetable@gmail.com</li>
              <li>Phone: +61 415 069 245</li>
              <li>
                Address: The University of Queensland Brisbane QLD 4072
                Australia
              </li>
            </ul>
            <p className="mb-4">
              By continuing to use our services, you confirm your acceptance of
              these terms and conditions.
            </p>
            {/* Close Button at the Bottom (Optional) */}
            <button
              onClick={() => setShowTermsModal(false)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal Box */}
      {showPrivacyModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowPrivacyModal(false)}
        >
          <div
            className="bg-white p-8 rounded shadow-lg max-h-screen overflow-y-auto relative w-11/12 max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" />
                <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">
              Privacy Policy
            </h2>
            <p className="text-xl mb-4 text-center">
              In regards to the Australian Privacy Act 1988
            </p>
            <p className="text-xl mb-4 text-center">
              Last updated: [15th October 2024]
            </p>
            {/* Privacy Policy Content */}
            <p className="mb-4">
              <strong>1. Introduction</strong>
              <br />
              [The Smart Coffee Table Company] ("we," "us," or "our") is
              committed to protecting the privacy of your personal information
              in accordance with the Privacy Act 1988 (Cth) and the Australian
              Privacy Principles (APPs). This Privacy Policy outlines how we
              collect, use, disclose, and protect your personal information when
              you interact with us.
            </p>
            <p className="mb-4">
              <strong>
                2. Open and Transparent Management of Personal Information
              </strong>
              <br />
              We manage your personal information in an open and transparent
              way. This Privacy Policy is readily available on our website, and
              you can request a copy by contacting us directly.
            </p>
            <p className="mb-4">
              <strong>3. Anonymity and Pseudonymity</strong>
              <br />
              Where practicable, you have the option to interact with us
              anonymously or using a pseudonym. However, certain services may
              require you to provide identifiable personal information.
            </p>
            <p className="mb-4">
              <strong>4. Collection of Personal Information</strong>
              <br />
              We only collect personal information that is reasonably necessary
              for our business functions and activities. This may include:
            </p>
            <ul className="mb-4 ml-8 list-disc">
              <li>
                Contact Information: Name, address, email, and phone number.
              </li>
              <li>
                Identification Details: Date of birth, gender, and other
                identifiers.
              </li>
              <li>
                Financial Information: Payment details if you make purchases.
              </li>
              <li>
                Usage Data: Information about how you use our website and
                services.
              </li>
            </ul>
            <p className="mb-4">
              We collect personal information directly from you unless it is
              unreasonable or impracticable to do so.
            </p>
            <p className="mb-4">
              <strong>5. Unsolicited Information</strong>
              <br />
              If we receive unsolicited personal information, we will determine
              whether it could have been collected under the APPs. If not, we
              will destroy or de-identify the information as soon as
              practicable, provided it is lawful and reasonable to do so.
            </p>
            <p className="mb-4">
              <strong>6. Notification of Collection</strong>
              <br />
              When we collect your personal information, we will take reasonable
              steps to notify you or ensure you are aware of the purpose of
              collection, any third parties we may disclose it to, and how you
              can access or correct your information.
            </p>
            <p className="mb-4">
              <strong>7. Use and Disclosure of Personal Information</strong>
              <br />
              We will only use or disclose your personal information for the
              primary purpose for which it was collected or a related secondary
              purpose that you would reasonably expect. We may disclose your
              information to:
            </p>
            <ul className="mb-4 ml-8 list-disc">
              <li>Service providers who assist us in our operations.</li>
              <li>Legal, accounting, or professional advisors.</li>
              <li>Regulatory authorities if required by law.</li>
            </ul>
            <p className="mb-4">
              <strong>8. Direct Marketing</strong>
              <br />
              We may use your personal information to provide you with marketing
              material about our services. You can opt-out of receiving
              marketing communications at any time by contacting us or using the
              unsubscribe function in our communications.
            </p>
            <p className="mb-4">
              <strong>9. Cross-Border Disclosure</strong>
              <br />
              Your personal information may be disclosed to overseas recipients
              located in [List of Countries]. We will take reasonable steps to
              ensure the overseas recipient does not breach the APPs in relation
              to your information.
            </p>
            <p className="mb-4">
              <strong>10. Government Identifiers</strong>
              <br />
              We will not use government identifiers (e.g., Tax File Numbers) as
              our own identifier of individuals. We will only use or disclose
              such identifiers where it is reasonably necessary to verify your
              identity for the purposes of our business activities.
            </p>
            <p className="mb-4">
              <strong>11. Quality of Personal Information</strong>
              <br />
              We take reasonable steps to ensure your personal information is
              accurate, up-to-date, and complete. Please contact us if any of
              your details change.
            </p>
            <p className="mb-4">
              <strong>12. Security of Personal Information</strong>
              <br />
              We protect your personal information from misuse, interference,
              loss, unauthorized access, modification, or disclosure through:
            </p>
            <ul className="mb-4 ml-8 list-disc">
              <li>Secure servers and encryption.</li>
              <li>Regular security assessments.</li>
              <li>Staff training on privacy obligations.</li>
            </ul>
            <p className="mb-4">
              <strong>13. Access to Personal Information</strong>
              <br />
              You have the right to request access to the personal information
              we hold about you. To do so, please contact us using the details
              below. We will respond to your request within a reasonable period.
            </p>
            <p className="mb-4">
              <strong>14. Correction of Personal Information</strong>
              <br />
              If you believe that any personal information we hold about you is
              incorrect, incomplete, or not up-to-date, please contact us. We
              will take reasonable steps to correct the information.
            </p>
            <p className="mb-4">
              <strong>15. Notifiable Data Breaches Scheme</strong>
              <br />
              In the event of a data breach likely to result in serious harm, we
              will notify affected individuals and the Office of the Australian
              Information Commissioner (OAIC) in accordance with the Notifiable
              Data Breaches (NDB) scheme.
            </p>
            <p className="mb-4">
              <strong>16. Cookies and Online Activity</strong>
              <br />
              We do not use cookies and similar technologies to collect
              information about your interaction with our device for analytical
              purposes.
            </p>
            <p className="mb-4">
              <strong>17. Changes to This Privacy Policy</strong>
              <br />
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. Changes will be effective when posted on our
              website.
            </p>
            <p className="mb-4">
              <strong>18. Complaints and Contact Details</strong>
              <br />
              If you have any questions, concerns, or complaints about our
              handling of your personal information, please contact us:
            </p>
            <ul className="mb-4 ml-8 list-disc">
              <li>Email: smartcoffeetable@gmail.com</li>
              <li>Phone: +61 415 069 245</li>
              <li>
                Address: The University of Queensland Brisbane QLD 4072
                Australia
              </li>
            </ul>
            <p className="mb-4">
              We will investigate your complaint and respond within a reasonable
              time. If you are not satisfied with our response, you may contact
              the OAIC.
            </p>
            <p className="mb-4">
              By providing your personal information to us, you consent to the
              terms of this Privacy Policy and the types of disclosure covered
              by this Policy. We appreciate your trust in us to handle your
              personal information responsibly.
            </p>
            {/* Close Button at the Bottom (Optional) */}
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
