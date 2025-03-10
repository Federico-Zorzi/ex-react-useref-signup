import { useState } from "react";

function App() {
  const specializationsList = ["Full Stack", "Frontend", "Backend"];
  const initValueStudentForm = {
    fullname: "",
    username: "",
    password: "",
    specialization: "",
    experience: 0,
    description: "",
  };
  const [studentFormData, setStudentFormData] = useState(initValueStudentForm);

  const handleInputChange = (e) => {
    setStudentFormData({ ...studentFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!studentFormData.fullname.trim()) {
      console.log("esco fullname");
      return;
    }

    if (!studentFormData.username.trim()) {
      console.log("esco username");
      return;
    }

    if (!studentFormData.password.trim()) {
      console.log("esco password");
      return;
    }

    if (studentFormData.experience <= 0) {
      console.log("esco experience");
      return;
    }

    if (!studentFormData.specialization) {
      console.log("esco specialization");
      return;
    }

    console.log("Inviato", studentFormData);
    setStudentFormData(initValueStudentForm);
  };

  return (
    <main>
      <h1>Registrazione studente</h1>

      <section id="student-form-section">
        <form id="student-form" onSubmit={handleSubmit}>
          <div className="form-row">
            {/* FULLNAME */}
            <div className="form-fields">
              <input
                type="text"
                placeholder="Inserisci nome completo..."
                name="fullname"
                value={studentFormData.fullname}
                onChange={handleInputChange}
              />
            </div>

            {/* USERNAME */}
            <div className="form-fields">
              <input
                type="text"
                placeholder="Inserisci il tuo username..."
                name="username"
                value={studentFormData.username}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            {/* PASSWORD */}
            <div className="form-fields">
              <input
                type="password"
                placeholder="Inserisci una password..."
                name="password"
                value={studentFormData.password}
                onChange={handleInputChange}
              />
            </div>

            {/* EXPERIENCE YEARS */}
            <div className="form-fields">
              <input
                type="number"
                placeholder="Inserisci gli anni di esperienza..."
                name="experience"
                value={studentFormData.experience}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* SPECIALIZATION */}
          <div className="form-row">
            <div className="form-fields">
              <select
                type="select"
                placeholder="Inserisci la tua specializzazione..."
                name="specialization"
                value={studentFormData.specialization}
                onChange={handleInputChange}
              >
                <option value="">Scegli una specializzazione...</option>
                {specializationsList.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* DESCRIPTION */}
            <div className="form-fields">
              <textarea
                placeholder="Inserisci una tua personale descrizione..."
                name="description"
                value={studentFormData.description}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div>
            <button id="form-button" type="submit">
              Invia
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default App;
