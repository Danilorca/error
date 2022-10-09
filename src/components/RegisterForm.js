import React from 'react';
import {Formik, Field, Form} from "formik";
import * as Yup from "yup";

const RegisterForm = (props) => {
  const {firstName, lastName, email, rut, password, confirmPassword, onSubmitProp}=props;


  return (
    <div>
      <Formik
        initialValues={
          {
          firstName: firstName,
          lastName: lastName,
          email: email,
          rut: rut,
          password: password,
          confirmPassword: confirmPassword,
        }
      }
        validationSchema={Yup.object().shape({
          firstName: Yup.string()
            .min(4, "El nombre es muy corto")
            .max(15, "El nombre es muy largo")
            .required("Por favor ingresa un nombre"),
          lastName: Yup.string()
            .min(4, "El apellido es muy corto")
            .max(15, "El apellido es muy largo")
            .required("Por favor ingresa un apellido"),
          email: Yup.string()
            .email("El formato del correo no es válido")
            .required("El correo es obligatorio"),
          rut: Yup.string()
            .matches(
              /^[0-9]+[-|-]{1}[0-9kK]{1}$/,
              "El formato del rut no es valido."
            )
            .required("El rut es obligatorio"),
          password: Yup.string()
            .required("La contraseña es obligatoria")
            .equals(
              [Yup.ref("confirmPassword", null)],
              "las contraseñas no son iguales"
            )
            .min(8, "La contraseña debe tener al menos 8 caracteres"),
          confirmPassword: Yup.string()
            .required("La confirmación de la contraseña es obligatoria")
            .equals(
              [Yup.ref("password", null)],
              "las contraseñas no son iguales"
            ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log("LA INFO DEL FORMULARIO: ", values);
          onSubmitProp(values);
        }}
      >
        {({ errors, touched, handleSubmit }) => {
          return (
            <div>
              <h2>Formulario de Registro</h2>
              <Form onSubmit={handleSubmit}>
                <label htmlFor="firstName">Nombre:</label>
                <Field
                  id="firstName"
                  type="text"
                  placeholder="Ingresa nombre"
                  name="firstName"
                  className="form-control"
                />
                {errors.firstName && touched.firstName && (
                  <p>{errors.firstName} </p>
                )}

                <label htmlFor="lastName">Apellido:</label>
                <Field
                  id="lastName"
                  type="text"
                  placeholder="Ingresa Apellido"
                  name="lastName"
                  className="form-control"
                />
                {errors.lastName && touched.lastName && (
                  <p>{errors.lastName} </p>
                )}

                <label htmlFor="email">Email:</label>
                <Field
                  id="email"
                  type="email"
                  placeholder="Ingresa tu correo"
                  name="email"
                  className="form-control"
                />
                {errors.email && touched.email && <p>{errors.email} </p>}

                <label htmlFor="rut">Rut(Sin puntos con guión):</label>
                <Field
                  id="rut"
                  type="text"
                  placeholder="Ingresa tu rut"
                  name="rut"
                  className="form-control"
                />
                {errors.rut && touched.rut && <p>{errors.rut} </p>}

                <label htmlFor="password">Contraseña:</label>
                <Field
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  name="password"
                  className="form-control"
                />
                {errors.password && touched.password && (
                  <p>{errors.password} </p>
                )}

                <label htmlFor="confirmPassword">Contraseña:</label>
                <Field
                  id="confirmPassword"
                  type="password"
                  placeholder="Ingresa confirmación de contraseña"
                  name="confirmPassword"
                  className="form-control"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p>{errors.password} </p>
                )}

                <button
                  type="submit"
                  disabled={Object.values(errors).length > 0}
                >
                  Registrarse
                </button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default RegisterForm;
