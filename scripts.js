const officeData = {
    "Office A": {
        Amenities: {
            Gym: "Modern gym with state-of-the-art equipment and a dedicated yoga studio.",
            Parking: "Ample parking with EV chargers and priority spaces for carpooling.",
            Cafeteria: "On-site cafeteria offering healthy meal options and specialty coffee."
        },
        Design: {
            Style: "Minimalist modern design with clean lines and neutral colors.",
            Features: "Bright spaces with large windows and ergonomic furniture."
        },
        Pricing: {
            Cost: "$50/sqft/year with flexible payment options.",
            LeaseIncentives: "5% discount for leases longer than 3 years."
        },
        Maintenance: {
            Cleaning: "Daily cleaning services with environmentally friendly products.",
            Support: "On-site maintenance team available during business hours."
        }
    },
    "Office B": {
        Amenities: {
            Gym: "Fully equipped fitness center with personal trainers and free group classes.",
            Parking: "Secure parking lot with covered bike racks and reserved visitor spots.",
            Lounge: "Stylish lounges with comfortable seating and quiet zones."
        },
        Design: {
            Style: "Industrial aesthetic featuring exposed brick and high ceilings.",
            Features: "Large collaborative spaces and private soundproof offices."
        },
        Pricing: {
            Cost: "$45/sqft/year, perfect for startups and small businesses.",
            LeaseIncentives: "First two months free with a 1-year commitment."
        },
        Maintenance: {
            Cleaning: "Weekly deep-cleaning services included in the rent.",
            Support: "Dedicated property manager available 24/7 for urgent issues."
        }
    },
    "Office C": {
        Amenities: {
            Gym: "Luxury gym with spa facilities and virtual fitness classes.",
            Parking: "Valet parking available with EV charging and VIP services.",
            Rooftop: "Rooftop terrace with garden seating and panoramic city views."
        },
        Design: {
            Style: "Contemporary chic with bold colors and high-end materials.",
            Features: "Customizable layouts with smart office technology integration."
        },
        Pricing: {
            Cost: "$60/sqft/year, premium for a luxury experience.",
            LeaseIncentives: "Flexible terms with rent-free periods for long-term contracts."
        },
        Maintenance: {
            Cleaning: "Daily cleaning, including touchpoint sanitization for high-traffic areas.",
            Support: "24/7 concierge and on-demand maintenance services."
        }
    }
};

let selectedOffice = null;
let clickData = [];

// Handle Office Selection
document.querySelectorAll('.office-button').forEach(button => {
    button.addEventListener('click', event => {
        selectedOffice = event.target.getAttribute('data-office');
        document.getElementById('info-title').textContent = `Selected Office: ${selectedOffice}`;
        document.getElementById('info-details').textContent = "Please select a feature to view details.";

        // Clear any sub-feature buttons when switching offices
        const subFeatureContainer = document.getElementById('sub-feature-buttons-container');
        subFeatureContainer.innerHTML = "";
        subFeatureContainer.style.display = "none";

        console.log(`Office selected: ${selectedOffice}`);
    });
});

// Handle Feature Category Selection
document.querySelectorAll('.feature-category').forEach(button => {
    button.addEventListener('click', event => {
        if (!selectedOffice) {
            alert("Please select an office first!");
            return;
        }

        const category = event.target.getAttribute('data-category');
        const subFeatureContainer = document.getElementById('sub-feature-buttons-container');
        subFeatureContainer.innerHTML = ""; // Clear existing sub-feature buttons
        subFeatureContainer.style.display = "block";

        const subFeatures = officeData[selectedOffice][category];
        for (const subFeature in subFeatures) {
            const subButton = document.createElement('button');
            subButton.className = 'feature-button';
            subButton.textContent = subFeature;
            subButton.addEventListener('click', () => {
                document.getElementById('info-title').textContent = `${selectedOffice} - ${category} - ${subFeature}`;
                document.getElementById('info-details').textContent = subFeatures[subFeature];
                clickData.push({
                    office: selectedOffice,
                    category: category,
                    subFeature: subFeature,
                    timestamp: new Date().toISOString()
                });
                console.log(`Sub-feature clicked: ${subFeature}, Category: ${category}, Office: ${selectedOffice}`);
            });
            subFeatureContainer.appendChild(subButton);
        }
    });
});

// Export Data to CSV
document.getElementById('export-data').addEventListener('click', () => {
    if (clickData.length === 0) {
        alert('No data to export!');
        return;
    }

    const csvContent = "data:text/csv;charset=utf-8,"
        + "Office,Category,SubFeature,Timestamp\n"
        + clickData.map(row => `${row.office},${row.category},${row.subFeature || ''},${row.timestamp}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'office_click_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

