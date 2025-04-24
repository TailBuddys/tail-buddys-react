import React, { useState } from "react";
import {
  Typography,
  Box,
  Container,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import PageHeader from "../components/PageHeader";
import { useSnackbar } from "../providers/SnackbarProvider";

export default function AboutPage() {
  const { snackbarActivation } = useSnackbar();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    snackbarActivation(
      "success",
      "Thank you for reaching out. We'll make sure to get in touch with you as soon as possible."
    );
  };

  return (
    <div>
      <PageHeader
        title="About Tail Buddys"
        subtitle="Get to know the vision, features, and team behind the Tail Buddys application"
      />
      <Container sx={{ textAlign: "left" }}>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h3" gutterBottom>
            Welcome to Tail Buddys
          </Typography>
          <Typography paragraph>
            Tail Buddys is a dynamic and user-friendly platform designed to
            connect dog owners and their furry friends. Our goal is to create a
            digital space that promotes community, fun, and interaction—both
            online and in real life.
          </Typography>

          <Typography variant="h3" gutterBottom>
            What We Offer
          </Typography>
          <Typography paragraph>
            The app includes features like Google-based login, personalized dog
            profiles, real-time messaging, AI-powered bot chats, and a
            Tinder-style matching system for dogs. You can discover parks via
            Google Maps, interact with other users, and enjoy a seamless
            responsive design on all your devices.
          </Typography>

          <Typography variant="h3" gutterBottom>
            Who It's For
          </Typography>
          <Typography paragraph>
            Whether you're a dog owner looking for a playmate for your pup, a
            park enthusiast, or an admin managing content—Tail Buddys provides
            tailored functionalities for each user type.
          </Typography>

          <Typography variant="h5" gutterBottom>
            Regular Users
          </Typography>
          <Typography paragraph>
            - Sign up and log in using email or Google.
            <br />- Browse and like parks and dog profiles.
            <br />- Chat in real-time with others and enjoy bot responses.
            <br />- Get notified about matches and messages.
          </Typography>

          <Typography variant="h5" gutterBottom>
            Business Users
          </Typography>
          <Typography paragraph>
            - Create, edit, and manage multiple dog profiles.
            <br />- Upload images and maintain visibility with the like feature.
          </Typography>

          <Typography variant="h5" gutterBottom>
            Admin Users
          </Typography>
          <Typography paragraph>
            - Manage and moderate all users, parks, and dog profiles.
            <br />- Access to an admin dashboard for full content control.
          </Typography>

          <Typography variant="h3" gutterBottom>
            Our Vision
          </Typography>
          <Typography paragraph>
            We believe in building a friendlier and more connected world for
            dogs and their humans. Tail Buddys isn’t just an app—it’s a
            community where tails wag together.
          </Typography>

          <Typography variant="h3" gutterBottom>
            Get in Touch
          </Typography>
          <Typography paragraph>
            We'd love to hear from you! Whether it’s feedback, questions, or
            partnership ideas—feel free to reach out.
          </Typography>
        </Box>
      </Container>

      <Box sx={{ p: 3, mt: 4 }}>
        <Container>
          <Divider>
            <Typography variant="h3" gutterBottom>
              Contact Us
            </Typography>
          </Divider>
          <Typography paragraph>
            If you have any questions or need further assistance, please don't
            hesitate to reach out.
          </Typography>
          <Typography paragraph>
            Email: <strong>tailBuddys@gmail.com</strong>
            <br />
            Phone: <strong>0545903310</strong>
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              required
            />
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              margin="normal"
              name="message"
              value={formData.message}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
