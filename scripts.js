const officeData = {
    "Office A": {
        Amenities: {
            "Gym": "Green-certified gym with energy-efficient equipment and natural lighting.",
            "Cafeteria": "On-site cafeteria offering healthy meal options and specialty coffee.",
            "Kitchen": "Minimal shared kitchenette with a coffee machine, microwave, and refrigerator.",
            "Medication Room": "Private corner room for medical needs, equipped with basic first-aid supplies.",
            "Communal Spaces": "No communal spaces",
            "Meeting Rooms": "High-tech conference rooms with touchscreen boards and teleconferencing capabilities.",
            "Parking": "Underground parking with limited spaces and bike racks.",
            "Noise Insulation": "Advanced acoustic paneling for reduced noise in open-plan areas.",
            "Accessibility": "Wheelchair-accessible entryways and elevators tailored for urban compliance."
        },
        "Design and Space": {
            "Style": "Minimalist modern design with clean lines and neutral colors.",
            "Space Utilization": "Compact space of 15,000 square feet spanning 3 floors, shared with multiple companies in a co-working setup."
        },
        Pricing: {
            "Cost": "$50/sqft/year with flexible payment options.",
            "Lease Incentives": "5% discount for leases longer than 3 years."
        },
        Maintenance: {
            "Cleaning": "Daily cleaning services with environmentally friendly products.",
            "Hygiene Control": "Availability of sanitizing stations and restroom hygiene",
            "Preventive inspection": "Regular inspection schedules",
            "Repair": "Timely repair of wear and tear",
            "Tenant Support and Communication": "On-site maintenance team available during business hours."
        }
    },
    "Office B": {
        Amenities: {
            "Gym": "Does not offer a gym.",
            "Cafeteria": "Sleek dining area offering quick grab-and-go meals and barista services.",
            "Kitchen": "Fully equipped shared kitchenettes with ample seating and modern appliances.",
            "Medication Room": "No medication rooms.",
            "Communal Spaces": "Cozy breakrooms and outdoor patios for relaxation and informal chats.",
            "Meeting Rooms": "Variety of sizes, from small huddle rooms to large conference spaces with projectors.",
            "Parking": "Expansive surface parking with dedicated EV charging stations.",
            "Noise Insulation": "Thick walls and carpeting to ensure minimal sound leakage between rooms.",
            "Accessibility": "Ramps, elevators, and priority parking for complete ADA compliance."
        },
        "Design and Space": {
            "Style": "Sleek and modern with glass walls and minimalist decor.",
            "Space Utilization": "Expansive 50,000 square feet across 2 floors, offering dedicated spaces for individual tenants."
        },
        Pricing: {
            "Cost": "$38/sqft/year, perfect for startups and small businesses.",
            "LeaseIncentives": "First two months free with a 1-year commitment."
        },
        Maintenance: {
            "Cleaning": "Daily cleaning services for common areas and individual workspaces.",
            "Hygiene Control": "Regular sanitation of high-touch surfaces and communal spaces.",
            "Preventive inspection": "Quarterly inspections to ensure building systems are in good condition.",
            "Repair": "Prompt on-call maintenance team for repairs within 24 hours.",
            "Tenant Support and Communication": "Dedicated tenant portal for requests and updates, with a response time of 12 hours."
        }
    },
    "Office C": {
        Amenities: {
            "Gym": "Does not offer a gym.",
            "Cafeteria": "Large dining hall with diverse cuisine options, including a salad bar and daily specials.",
            "Kitchen": "Minimal shared kitchenette with a coffee machine, microwave, and refrigerator.",
            "Medication Room": "No medication rooms.",
            "Communal Spaces": "No communal spaces",
            "Meeting Rooms": "Sustainable meeting spaces equipped with energy-efficient technology.",
            "Parking": "Solar-paneled carports with ample bike storage and carpool incentives.",
            "Noise Insulation": "Not specifically provided beyond standard building construction.",
            "Accessibility": "Thoughtful pathways and elevators designed for both environmental and mobility considerations."
        },
        "Design and Space": {
            "Style": "Contemporary chic with bold colors and high-end materials. Can add on customized design.",
            "Space Utilization": "Mid-sized 25,000 square feet over 4 floors, partially shared with other eco-focused businesses."
        },
        Pricing: {
            "Cost": "$45/sqft/year with flexible payment options.",
            "LeaseIncentives": "Flexible terms with rent-free periods for long-term contracts."
        },
        Maintenance: {
            "Cleaning": "Eco-friendly cleaning services using non-toxic products performed daily.",
            "Hygiene Control": "UV sanitization in shared spaces and green-certified air filters.",
            "Preventive inspection": "Quarterly inspections to ensure building systems are in good condition.",
            "Repair": "Responsive repair team with a focus on sustainable materials and methods.",
            "Tenant Support and Communication": "Dedicated support team offering a 24-hour response guarantee via app-based communication."
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

