import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { message } from "antd";
import axios from "axios";
import userContext from "../../context/userContext";

const FormGroup = ({ register, errors, type, placeholder, label, id, required, pattern, message: validationMessage }) => {
  return (
      <Form.Group className="mb-3" controlId={id}>
        {id === "superuser" ? (
            <Form.Check
                type={type}
                label="Admin rights?"
                {...register(id)}
            />
        ) : (
            <>
              <Form.Label className="fw-bold">{label}</Form.Label>
              <Form.Control
                  type={type}
                  placeholder={placeholder}
                  {...register(id, {
                    required: required && "This field is required",
                    pattern: pattern && {
                      value: pattern,
                      message: validationMessage,
                    },
                  })}
              />
            </>
        )}
        {errors?.message && (
            <Form.Text className="text-danger">{errors?.message}</Form.Text>
        )}
      </Form.Group>
  );
};

const NewUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const authUser = useContext(userContext);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const formData = {
        email: data.email,
        password: data.password,
        joiningDate: data.joinDate,
        position: data.position,
        name: data.name,
        isSuperUser: data.superuser || false,
        address: data.address,
        dateOfBirth: data.dateOfBirth,
        githubId: data.githubId,
        linkedIn: data.linkedIn,
        phone: data.tel,
      };
      const response = await axios.post(
          "https://employee-management-system-ujnj.onrender.com/api/superuser/signup",
          formData,
          {
            headers: {
              Authorization: "Bearer " + authUser.token,
            },
          }
      );
      console.log(response);
      message.success(response.data.message);
    } catch (error) {
      console.log(error);
      message.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
      <div className="mt-4">
        <h2 className="text-center profile-detail-heading">ADD Employee</h2>
        <div className="d-flex justify-content-center my-4">
          <Form onSubmit={handleSubmit(onSubmit)} className="px-2 py-1 mt-2 w-75">
            <div className="row">
              <div className="col-6">
                <FormGroup
                    register={register}
                    errors={errors.name}
                    type="text"
                    placeholder="Enter your name"
                    label="Full Name"
                    id="name"
                    required={true}
                />
                <FormGroup
                    register={register}
                    errors={errors.email}
                    type="email"
                    placeholder="abc@gmail.com"
                    label="Email Address"
                    id="email"
                    required={true}
                    pattern={/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/}
                    message="Please enter a valid email"
                />
                <FormGroup
                    register={register}
                    errors={errors.password}
                    type="password"
                    placeholder="Password"
                    label="Password"
                    id="password"
                    required={true}
                    pattern={/^([a-zA-Z0-9@*#$%^&*!]{6,15})$/}
                    message="Password should contain at least 8 characters"
                />
                <FormGroup
                    register={register}
                    errors={errors.joinDate}
                    type="date"
                    placeholder="Joining Date"
                    label="Joining Date"
                    id="joinDate"
                    required={true}
                />
                <FormGroup
                    register={register}
                    errors={errors.position}
                    type="text"
                    placeholder="Position"
                    label="Position"
                    id="position"
                    required={true}
                />
                <FormGroup
                    register={register}
                    errors={errors.dateOfBirth}
                    type="date"
                    placeholder=""
                    label="Date Of Birth"
                    id="dateOfBirth"
                    required={true}
                    pattern={/^\d{4}-\d{2}-\d{2}$/}
                    message="Please enter a valid date"
                />
                <FormGroup
                    register={register}
                    errors={errors.superuser}
                    type="checkbox"
                    id="superuser"
                    required={false}
                />
              </div>
              <div className="col-6">
                <FormGroup
                    register={register}
                    errors={errors.address}
                    type="text"
                    placeholder="City, State"
                    label="Address"
                    id="address"
                    required={true}
                />
                <FormGroup
                    register={register}
                    errors={errors.linkedIn}
                    type="text"
                    placeholder="Enter your LinkedIn ID"
                    label="LinkedIn ID"
                    id="linkedIn"
                    required={true}
                />
                <FormGroup
                    register={register}
                    errors={errors.githubId}
                    type="text"
                    placeholder="Enter your GitHub ID"
                    label="GitHub ID"
                    id="githubId"
                    required={true}
                />
                <FormGroup
                    register={register}
                    errors={errors.tel}
                    type="tel"
                    placeholder=""
                    label="Phone Number"
                    id="tel"
                    required={true}
                    pattern={/^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/}
                    message="Please enter a valid phone number"
                />
              </div>
            </div>
            <Button variant="primary" type="submit" className="custom-button w-100 p-2 mb-4">
              Submit
            </Button>
          </Form>
        </div>
      </div>
  );
};

export default NewUser;
