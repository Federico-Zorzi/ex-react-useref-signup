import { useRef, useState } from "react";

function App() {
  /* console.log("Render"); */

  const specializationsList = ["Full Stack", "Frontend", "Backend"];
  const initValueStudentForm = {
    username: "",
    password: "",
    specialization: "",
  };
  const initValidationForm = {
    isValidFullname: false,
    isValidUsername: false,
    isValidPassword: false,
    isValidExperience: false,
    isValidDescription: false,
  };

  const fullname = useRef("");
  const experience = useRef(null);
  const description = useRef("");

  const [isChecked, setIsChecked] = useState(false);
  const [studentFormData, setStudentFormData] = useState(initValueStudentForm);
  const [validationStudentForm, setValidationStudentForm] =
    useState(initValidationForm);

  const handleInputChange = (e) => {
    const letters = /[a-zA-Z]/;
    const numbers = /[0-9]/;
    const symbols = /[!@#$%^&*()\-=+\[\]{}|;:'"\\,.<>?/`~]/;
    /* console.log(e.target.name, e.target.value); */

    let inputValue = e.target.value;

    setValidationStudentForm((currVal) => {
      let updateValidation = { ...validationStudentForm };
      if (e.target.name === "username") {
        updateValidation.isValidUsername =
          inputValue.trim().length >= 6 || inputValue.trim().length === 0;
      }

      if (e.target.name === "password") {
        updateValidation.isValidPassword =
          (letters.test(inputValue) &&
            numbers.test(inputValue) &&
            symbols.test(inputValue) &&
            inputValue.trim().length >= 8) ||
          inputValue.trim().length === 0;
      }

      return updateValidation;
    });

    setStudentFormData((currVal) => ({
      ...currVal,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* console.log("validationStudentForm", validationStudentForm); */
    /* console.log("fullname.current", fullname.current.value); */

    let updateValidation = { ...validationStudentForm };
    updateValidation.isValidFullname = fullname.current.value.trim().length > 0;
    updateValidation.isValidExperience = experience.current.value >= 0;
    updateValidation.isValidDescription =
      description.current.value.length >= 100 &&
      description.current.value.length <= 1000;
    setValidationStudentForm(updateValidation);
    setIsChecked(true);

    if (
      updateValidation.isValidFullname &&
      updateValidation.isValidUsername &&
      updateValidation.isValidPassword &&
      updateValidation.isValidExperience &&
      updateValidation.isValidDescription
    ) {
      console.log("Dati inviati: ", {
        ...studentFormData,
        fullname: fullname.current.value,
        experience: experience.current.value,
        description: description.current.value,
      });

      fullname.current.value = "";
      experience.current.value = "";
      description.current.value = "";

      setStudentFormData(initValueStudentForm);
      setValidationStudentForm(initValidationForm);
      setIsChecked(false);
    }
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
                ref={fullname}
                placeholder="Inserisci nome completo..."
                required
              />
              {isChecked &&
              fullname.current &&
              fullname.current.value.length > 0 ? (
                validationStudentForm.isValidFullname ? (
                  <p className="valid-message-validation">
                    Nome inserito valido.
                  </p>
                ) : (
                  <p className="error-message-validation">
                    Il nome inserito non è valido.
                  </p>
                )
              ) : null}
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
              {studentFormData.username.length > 0 ? (
                validationStudentForm.isValidUsername ? (
                  <p className="valid-message-validation">
                    Username inserito valido.
                  </p>
                ) : (
                  <p className="error-message-validation">
                    Inserisci un username di almeno 6 caratteri.
                  </p>
                )
              ) : null}
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

              {studentFormData.password.length > 0 ? (
                validationStudentForm.isValidPassword ? (
                  <p className="valid-message-validation">
                    Password inserita valida.
                  </p>
                ) : (
                  <p className="error-message-validation">
                    La password inserita deve contenere almeno 8 caratteri, 1
                    lettera, 1 numero e 1 simbolo.
                  </p>
                )
              ) : null}
            </div>

            {/* EXPERIENCE YEARS */}
            <div className="form-fields">
              <label htmlFor="experience">Anni di esperienza</label>
              <input
                id="experience"
                type="number"
                placeholder="Inserisci gli anni di esperienza..."
                ref={experience}
                required
              />
              {isChecked ? (
                experience.current && experience.current.value > 0 ? (
                  <p className="valid-message-validation">
                    Anni di esperienza inseriti validi.
                  </p>
                ) : (
                  <p className="error-message-validation">
                    Gli anni di esperienza devono essere maggiori o uguali a 0.
                  </p>
                )
              ) : null}
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
                ref={description}
              />

              {isChecked &&
              description.current &&
              description.current.value.length > 0 ? (
                validationStudentForm.isValidDescription ? (
                  <p className="valid-message-validation">
                    Descrizione inserita valida.
                  </p>
                ) : (
                  <p className="error-message-validation">
                    La descrizione deve contenere tra i 100 e i 1000 caratteri
                  </p>
                )
              ) : null}
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
