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
  const initValidationForm = {
    validFullname: true,
    validUsername: true,
    validPassword: true,
    validExperience: true,
  };

  const [studentFormData, setStudentFormData] = useState(initValueStudentForm);
  const [validationStudentForm, setValidationStudentForm] =
    useState(initValidationForm);
  /* console.log(validationStudentForm); */

  const handleInputChange = (e) => {
    setStudentFormData({ ...studentFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let updateValidation = { ...validationStudentForm };

    if (!studentFormData.fullname.trim()) {
      isValid = false;
      updateValidation.validFullname = false;
    }

    if (!studentFormData.username.trim()) {
      isValid = false;
      updateValidation.validUsername = false;
    }

    if (!studentFormData.password.trim()) {
      isValid = false;
      updateValidation.validPassword = false;
    }

    if (studentFormData.experience < 0) {
      isValid = false;
      updateValidation.validExperience = false;
    }

    setValidationStudentForm(updateValidation);

    if (!isValid) return;

    console.log("Inviato", studentFormData);
    setStudentFormData(initValueStudentForm);
    setValidationStudentForm(initValidationForm);
  };

  return (
    <main>
      <h1>Registrazione studente</h1>

      <section id="student-form-section">
        <form id="student-form" onSubmit={handleSubmit}>
          <div className="form-row">
            {/* FULLNAME */}
            <div className="form-fields">
              <label htmlFor="fullname">Nome Completo</label>
              <input
                id="fullname"
                type="text"
                placeholder="Inserisci nome completo..."
                name="fullname"
                value={studentFormData.fullname}
                onChange={handleInputChange}
                required
              />
              {!validationStudentForm.validFullname && (
                <p className="error-message-validation">
                  Il nome inserito non è valido
                </p>
              )}
            </div>

            {/* USERNAME */}
            <div className="form-fields">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Inserisci il tuo username..."
                name="username"
                value={studentFormData.username}
                onChange={handleInputChange}
                required
              />
              {!validationStudentForm.validUsername && (
                <p className="error-message-validation">
                  L'username non è valido
                </p>
              )}
            </div>
          </div>

          <div className="form-row">
            {/* PASSWORD */}
            <div className="form-fields">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                type="password"
                placeholder="Inserisci una password..."
                name="password"
                value={studentFormData.password}
                onChange={handleInputChange}
                required
              />
              {!validationStudentForm.validPassword && (
                <p className="error-message-validation">
                  La password inserita non è valida
                </p>
              )}
            </div>

            {/* EXPERIENCE YEARS */}
            <div className="form-fields">
              <label htmlFor="experience">Anni di esperienza</label>
              <input
                id="experience"
                type="number"
                placeholder="Inserisci gli anni di esperienza..."
                name="experience"
                value={studentFormData.experience}
                onChange={handleInputChange}
                required
              />
              {!validationStudentForm.validExperience && (
                <p className="error-message-validation">
                  Gli anni di esperienza devono essere maggiori o uguali a 0
                </p>
              )}
            </div>
          </div>

          {/* SPECIALIZATION */}
          <div className="form-row">
            <div className="form-fields">
              <label htmlFor="specialization">Specializzazione</label>
              <select
                id="specialization"
                type="select"
                placeholder="Inserisci la tua specializzazione..."
                name="specialization"
                value={studentFormData.specialization}
                onChange={handleInputChange}
                required
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
              <label htmlFor="description">Descrizione studente</label>

              <textarea
                id="description"
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
