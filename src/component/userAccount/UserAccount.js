import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { getUsers, addUser } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../layout/Loading";

import FirstCurve from "../../Pic/formSvg/curve1.svg";
import SecondCurve from "../../Pic/formSvg/curve2.svg";

const UserAccount = () => {
  const getUser = useSelector((state) => state.users);
  const { users, loading } = getUser;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const [bool, setBool] = useState(false);

  // initial formik value
  const initialValue = {
    email: "",
    password: "",
  };

  const login = useRef();
  const logup = useRef();

  if (loading || users === null) {
    return (
      <div
        style={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </div>
    );
  }

  // handle form slide
  const goLogup = () => {
    if (bool === false) {
      setBool(true);
      login.current.style.transform = "translateX(-335px) rotateY(90deg)";
      logup.current.style.transform = "translateX(0px) rotateY(0deg)";
    }
  };

  const goLogin = () => {
    if (bool === true) {
      setBool(false);
      login.current.style.transform = "translateX(0px) rotateY(0deg)";
      logup.current.style.transform = "translateX(335px) rotateY(90deg)";
    }
  };

  // get users email
  const emailAddresses = users.map((user) => user.email);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert("با موفقیت ثبت شد" + JSON.stringify(values.email, null, 2));
      resetForm();
      setSubmitting(false);
      dispatch(addUser(values));
    }, 1000);
  };

  const lowercaseRegex = /(?=.*[a-z])/;
  const uppercaseRegex = /(?=.*[A-Z])/;
  const numericRegex = /(?=.*[0-9])/;

  // signupSchema
  const signupSchema = Yup.object().shape({
    email: Yup.string()
      .email("ایمیل معتبر وارد کنید")
      .notOneOf(emailAddresses, "ایمیل موجود میباشد")
      .required("ضروری"),
    password: Yup.string()
      .matches(uppercaseRegex, "یک حرف بزرگ وارد کنید")
      .matches(lowercaseRegex, "یک حرف کوچک وارد کنید")
      .matches(numericRegex, "یک عدد وارد کنید")
      .min(8, "حداقل 8 کارکتر وارد کنید")
      .required("ضروری"),
  });

  return (
    <div className="accountWrapper">
      <div className="logup" ref={logup}>
        <h3>ثبت نام در یو شاپ</h3>
        <img src={FirstCurve} className="firstCurve" alt="curve" />
        <img src={SecondCurve} className="secondCurve" alt="curve" />
        <Formik
          initialValues={initialValue}
          onSubmit={handleSubmit}
          validationSchema={signupSchema}
        >
          {({ errors, touched }) => {
            return (
              <Form>
                <Field type="email" name="email" placeholder="ایمیل" required autoComplete="off" />
                {touched.email && errors.email ? (
                  <p className="msg">{errors.email}</p>
                ) : null}

                <Field
                  type="password"
                  name="password"
                  placeholder="رمز عبور"
                  required
                  autoComplete="off"
                />
                {touched.password && errors.password ? (
                  <p className="msg">{errors.password}</p>
                ) : null}

                <button type="submit">ثبت نام</button>
              </Form>
            );
          }}
        </Formik>
        <p>
          برای{" "}
          <span className="goLogin" onClick={goLogin}>
            ورود{" "}
          </span>
          کلیک کنید
        </p>
      </div>

      <div className="login" ref={login}>
        <h3>ورود به یو شاپ</h3>
        <img src={FirstCurve} className="firstCurve" alt="curve" />
        <img src={SecondCurve} className="secondCurve" alt="curve" />
        <form action="#!">
          <input type="email" name="email" placeholder="ایمیل" required autoComplete="off" />
          <input
            type="password"
            name="password"
            placeholder="رمز عبور"
            required
            autoComplete="off"
          />
          <button type="submit">ورود</button>
        </form>
        <p>
          کاربر جدید هستید{" "}
          <span className="goLogup" onClick={goLogup}>
            ثبت نام{" "}
          </span>
          کنید
        </p>
      </div>
    </div>
  );
};

export default UserAccount;
