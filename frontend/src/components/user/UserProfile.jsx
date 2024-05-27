import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../../api/user";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import Title from "../form/Title";

const UserProfile = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await getUserDetails(userId);
        setUserDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return (
      <FormContainer>
        <Container>
          <p>Loading...</p>
        </Container>
      </FormContainer>
    );
  }

  if (error) {
    return (
      <FormContainer>
        <Container>
          <p>Error: {error}</p>
        </Container>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <Container>
        {userDetails && (
          <div>
            <Title>User Details</Title>
            <p>ID: {userDetails.id}</p>
            <p>Name: {userDetails.name}</p>
            <p>Email: {userDetails.email}</p>
            <p>Is Verified: {userDetails.isVerified ? "Yes" : "No"}</p>
            <p>Role: {userDetails.role}</p>
          </div>
        )}
      </Container>
    </FormContainer>
  );
};

export default UserProfile;
