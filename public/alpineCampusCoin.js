document.addEventListener("alpine:init", () => {
    Alpine.data("campusCoin", () => ({
        username: "",
        points: null,
        selectedPlatform: "",
        
        async fetchPoints(platform) {
            this.selectedPlatform = platform;
            const response = await fetch(`/api/${platform}/username/${this.username}`);
            const data = await response.json();
            this.points = data.points;
        },

        async fetchOverallPoints() {
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

        studentNumber: "",
        password: "",
        confirmPassword: "",
        errorMessage: "",

        async submitForm() {
            if (this.password !== this.confirmPassword) {
                this.errorMessage = "Passwords do not match!";
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
        }
    }));
});