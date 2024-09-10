document.addEventListener("alpine:init", () => {
    Alpine.data("campusCoin", () => ({
        username: "",
        points: null,
        selectedPlatform: "",
        studentNumber: "",
        password: "",
        confirmPassword: "",
        errorMessage: "",
        showModal: false,

        allowedStudentNumbers: ["0001", "0002", "0003", "0004"],  // Allowed student numbers
        
        async fetchPoints(platform) {
            console.log(`Fetching points for ${platform} and username ${this.username}`);
            this.selectedPlatform = platform;
            const response = await fetch(`/api/${platform}/username/${this.username}`);
            const data = await response.json();
            this.points = data.points;
        },

        async fetchOverallPoints() {
            console.log(`Fetching overall points for username ${this.username}`);
            this.selectedPlatform = 'overall';
            const platforms = ['checkers60', 'takealot', 'uber', 'uberEats'];
            let totalPoints = 0;

            for (let platform of platforms) {
                const response = await fetch(`/api/${platform}/username/${this.username}`);
                const data = await response.json();
                totalPoints += data.points;
            }

            this.points = totalPoints;
        },

        async login() {
            // Check if the student number is in the allowed list
            if (!this.allowedStudentNumbers.includes(this.studentNumber)) {
                this.errorMessage = "This student number is not allowed to log in.";
                return;
            }

            // Add logic for logging in (e.g., call your backend API to verify credentials)
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    studentNumber: this.studentNumber,
                    password: this.password
                })
            });

            const data = await response.json();

            if (data.success) {
                window.location.href = 'dashboard.html';  // Redirect to dashboard page
            } else {
                this.errorMessage = data.message;
            }
        },

        async submitForm() {
            if (this.password !== this.confirmPassword) {
                this.errorMessage = "Passwords do not match!";
                return;
            }

            if (!this.allowedStudentNumbers.includes(this.studentNumber)) {
                this.errorMessage = "This student number is not allowed to log in.";
                return;
            }

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    studentNumber: this.studentNumber,
                    password: this.password
                })
            });

            const data = await response.json();

            if (data.success) {
                window.location.href = 'index.html';  // Redirect to login page
            } else {
                this.errorMessage = data.message;
            }
        },

        logOut() {
            localStorage.removeItem('loggedInStudent');  // Clear logged-in student data
            window.location.href = 'index.html';  // Redirect to login page
        },

        goBackToDashboard() {
            window.location.href = 'dashboard.html';  // Use relative path to redirect to dashboard.html
        }
    }));
});


