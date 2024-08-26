const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      const loginResponse = await fetch(`https://localhost:7281/api/Auth/Login?Email=${encodeURIComponent(formData.email)}&Password=${encodeURIComponent(formData.password)}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (loginResponse.ok) {
          const data = await loginResponse.json();
          const token = data.token?.access;
          if (token) {
              sessionStorage.setItem('token', token);

              const decodedToken = JSON.parse(atob(token.split('.')[1]));
              const { name, email, role } = decodedToken;
              sessionStorage.setItem('userName', name);
              sessionStorage.setItem('userEmail', email);
              sessionStorage.setItem('userRole', role);

              alert('Logged in successfully!');
              sessionStorage.setItem('isLoggedIn', 'true');

              // Redirect based on role
              if (role === 'Admin') {
                  window.location.href = '/admin';
              } else {
                  window.location.reload();
              }
          } else {
              alert('Failed to retrieve a valid token.');
              sessionStorage.setItem('isLoggedIn', 'false');
          }
      } else {
          alert('Failed to log in. Please try again.');
          sessionStorage.setItem('isLoggedIn', 'false');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
      sessionStorage.setItem('isLoggedIn', 'false');
  }
};
