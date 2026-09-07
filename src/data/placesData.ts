export interface Place {
  id: string;
  name: string;
  type: string;
  city: string;
  address: string;
  phone: string;
  score: number;
  features: string[];
  blindFeatures: string[];
  wheelchairFeatures: string[];
  hearingFeatures: string[];
  communicationFeatures: string[];
  cognitiveFeatures: string[];
}

const d = (overrides: Partial<Place> & Pick<Place, "name" | "type" | "city">): Place => ({
  id: `${overrides.city.toLowerCase().replace(/\s+/g, "-")}-${overrides.name.toLowerCase().replace(/\s+/g, "-")}`,
  address: overrides.city,
  phone: "+91 1800 000 1234",
  score: 4.0 + Math.random() * 1.0,
  features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking", "Staff Assistance"],
  blindFeatures: ["Braille signage", "Tactile guidance paths", "Audio announcements", "Staff assistance for navigation", "Guide-dog access"],
  wheelchairFeatures: ["Ramps", "Elevator", "Accessible parking", "Accessible restrooms", "Wide doorways"],
  hearingFeatures: ["Visual announcements", "Captioning support", "Written communication available"],
  communicationFeatures: ["Staff communication assistance", "Visual aids available"],
  cognitiveFeatures: ["Simplified information available", "Staff trained in accessibility support"],
  ...overrides,
});

export const allPlaces: Place[] = [
  // ═══════════════════════════════════════ DELHI ═══════════════════════════════════════
  d({ name: "All India Institute of Medical Sciences", type: "Hospital", city: "Delhi", address: "Sri Aurobindo Marg, Delhi", phone: "+91 1800 000 1234", score: 4.8, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "Delhi Public School", type: "School", city: "Delhi", address: "Mathura Road, Delhi", phone: "+91 1800 000 5678", score: 4.5, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom"] }),
  d({ name: "University of Delhi", type: "College", city: "Delhi", address: "North Campus, Delhi", score: 4.4, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking"] }),
  d({ name: "Select Citywalk Mall", type: "Shopping Mall", city: "Delhi", address: "Saket, Delhi", score: 4.3, features: ["Wheelchair Access", "Elevator", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "New Delhi Railway Station", type: "Railway Station", city: "Delhi", address: "Connaught Place, Delhi", score: 3.9, features: ["Elevator", "Tactile paths", "Audio Announcements", "Accessible Restroom", "Accessible Parking"] }),
  d({ name: "Indira Gandhi International Airport", type: "Airport", city: "Delhi", address: "Palam, Delhi", score: 4.7, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "Rashtrapati Bhavan Visitors Centre", type: "Public Building", city: "Delhi", address: "Rajpath, Delhi", score: 4.1, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Staff Assistance"] }),
  d({ name: "Lodhi Garden", type: "Park", city: "Delhi", address: "Lodhi Estate, Delhi", score: 4.2, features: ["Wheelchair Access", "Accessible Restroom", "Staff Assistance", "Paved paths"] }),

  // ═══════════════════════════════════════ BENGALURU ═══════════════════════════════════════
  d({ name: "Manipal Hospital", type: "Hospital", city: "Bengaluru", address: "HAL Airport Road, Bengaluru", score: 4.6, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "Baldwin Girls High School", type: "School", city: "Bengaluru", address: "Richmond Road, Bengaluru", score: 4.3, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Accessible Restroom"] }),
  d({ name: "Indian Institute of Science", type: "College", city: "Bengaluru", address: "Malleshwaram, Bengaluru", score: 4.7, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "Phoenix Marketcity", type: "Shopping Mall", city: "Bengaluru", address: "Whitefield, Bengaluru", score: 4.4, features: ["Wheelchair Access", "Elevator", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "Bengaluru City Railway Station", type: "Railway Station", city: "Bengaluru", address: "Majestic, Bengaluru", score: 3.8, features: ["Elevator", "Tactile paths", "Audio Announcements", "Accessible Restroom"] }),
  d({ name: "Kempegowda International Airport", type: "Airport", city: "Bengaluru", address: "Devanahalli, Bengaluru", score: 4.6, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "Vidhana Soudha", type: "Public Building", city: "Bengaluru", address: "Dr. Ambedkar Veedhi, Bengaluru", score: 3.9, features: ["Wheelchair Access", "Elevator", "Staff Assistance"] }),
  d({ name: "Cubbon Park", type: "Park", city: "Bengaluru", address: "Kasturba Road, Bengaluru", score: 4.3, features: ["Wheelchair Access", "Paved paths", "Accessible Restroom"] }),

  // ═══════════════════════════════════════ MUMBAI ═══════════════════════════════════════
  d({ name: "Breach Candy Hospital", type: "Hospital", city: "Mumbai", address: "Bhulabhai Desai Road, Mumbai", score: 4.5, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Staff Assistance"] }),
  d({ name: "Cathedral and John Connon School", type: "School", city: "Mumbai", address: "Fort, Mumbai", score: 4.4, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Accessible Restroom"] }),
  d({ name: "St. Xavier's College", type: "College", city: "Mumbai", address: "Fort, Mumbai", score: 4.3, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking"] }),
  d({ name: "Inorbit Mall", type: "Shopping Mall", city: "Mumbai", address: "Malad West, Mumbai", score: 4.2, features: ["Wheelchair Access", "Elevator", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "Chhatrapati Shivaji Maharaj Terminus", type: "Railway Station", city: "Mumbai", address: "Fort, Mumbai", score: 3.7, features: ["Elevator", "Tactile paths", "Audio Announcements", "Accessible Restroom"] }),
  d({ name: "Chhatrapati Shivaji Maharaj International Airport", type: "Airport", city: "Mumbai", address: "Sahar, Mumbai", score: 4.5, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "Brihanmumbai Municipal Corporation", type: "Public Building", city: "Mumbai", address: "Fort, Mumbai", score: 3.8, features: ["Wheelchair Access", "Elevator", "Staff Assistance"] }),
  d({ name: "Sanjay Gandhi National Park", type: "Park", city: "Mumbai", address: "Borivali East, Mumbai", score: 4.0, features: ["Wheelchair Access", "Paved paths", "Accessible Restroom"] }),

  // ═══════════════════════════════════════ CHENNAI ═══════════════════════════════════════
  d({ name: "Apollo Hospitals", type: "Hospital", city: "Chennai", address: "Greams Road, Chennai", score: 4.7, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "D.A.V. Public School", type: "School", city: "Chennai", address: "Adyar, Chennai", score: 4.2, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Accessible Restroom"] }),
  d({ name: "Loyola College", type: "College", city: "Chennai", address: "Nungambakkam, Chennai", score: 4.3, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking"] }),
  d({ name: "Express Avenue Mall", type: "Shopping Mall", city: "Chennai", address: "Royapettah, Chennai", score: 4.4, features: ["Wheelchair Access", "Elevator", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "Chennai Central Railway Station", type: "Railway Station", city: "Chennai", address: "Park Town, Chennai", score: 3.8, features: ["Elevator", "Tactile paths", "Audio Announcements", "Accessible Restroom"] }),
  d({ name: "Chennai International Airport", type: "Airport", city: "Chennai", address: "Meenambakkam, Chennai", score: 4.5, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "Madras High Court", type: "Public Building", city: "Chennai", address: "Parry's Corner, Chennai", score: 3.7, features: ["Wheelchair Access", "Elevator", "Staff Assistance"] }),
  d({ name: "Guindy National Park", type: "Park", city: "Chennai", address: "Guindy, Chennai", score: 4.1, features: ["Wheelchair Access", "Paved paths", "Accessible Restroom"] }),

  // ═══════════════════════════════════════ HYDERABAD ═══════════════════════════════════════
  d({ name: "Narayana Health City", type: "Hospital", city: "Hyderabad", address: "Bombay Road, Hyderabad", score: 4.6, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "Hyderabad Public School", type: "School", city: "Hyderabad", address: "Begumpet, Hyderabad", score: 4.4, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Accessible Restroom"] }),
  d({ name: "University of Hyderabad", type: "College", city: "Hyderabad", address: "Gachibowli, Hyderabad", score: 4.3, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking"] }),
  d({ name: "Inorbit Mall Hyderabad", type: "Shopping Mall", city: "Hyderabad", address: "HITEC City, Hyderabad", score: 4.3, features: ["Wheelchair Access", "Elevator", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "Secunderabad Railway Station", type: "Railway Station", city: "Hyderabad", address: "Secunderabad, Hyderabad", score: 3.8, features: ["Elevator", "Tactile paths", "Audio Announcements", "Accessible Restroom"] }),
  d({ name: "Rajiv Gandhi International Airport", type: "Airport", city: "Hyderabad", address: "Shamshabad, Hyderabad", score: 4.6, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "Telangana Secretariat", type: "Public Building", city: "Hyderabad", address: "Abids, Hyderabad", score: 3.7, features: ["Wheelchair Access", "Elevator", "Staff Assistance"] }),
  d({ name: "KBR National Park", type: "Park", city: "Hyderabad", address: "Jubilee Hills, Hyderabad", score: 4.2, features: ["Wheelchair Access", "Paved paths", "Accessible Restroom"] }),

  // ═══════════════════════════════════════ PUNE ═══════════════════════════════════════
  d({ name: "Ruby Hall Clinic", type: "Hospital", city: "Pune", address: "Sassoon Road, Pune", score: 4.5, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "The Orchid School", type: "School", city: "Pune", address: "Baner, Pune", score: 4.3, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Accessible Restroom"] }),
  d({ name: "Symbiosis International University", type: "College", city: "Pune", address: "Viman Nagar, Pune", score: 4.5, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "Phoenix Marketcity Pune", type: "Shopping Mall", city: "Pune", address: "Viman Nagar, Pune", score: 4.3, features: ["Wheelchair Access", "Elevator", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "Pune Railway Station", type: "Railway Station", city: "Pune", address: "Camp, Pune", score: 3.7, features: ["Elevator", "Tactile paths", "Audio Announcements", "Accessible Restroom"] }),
  d({ name: "Pune International Airport", type: "Airport", city: "Pune", address: "Lohegaon, Pune", score: 4.3, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking"] }),
  d({ name: "Pune Municipal Corporation", type: "Public Building", city: "Pune", address: "Shivajinagar, Pune", score: 3.8, features: ["Wheelchair Access", "Elevator", "Staff Assistance"] }),
  d({ name: "Empress Garden", type: "Park", city: "Pune", address: "Near Race Course, Pune", score: 4.1, features: ["Wheelchair Access", "Paved paths", "Accessible Restroom"] }),

  // ═══════════════════════════════════════ MYSURU ═══════════════════════════════════════
  d({ name: "Apollo BGS Hospital", type: "Hospital", city: "Mysuru", address: "Adichunchanagiri Road, Mysuru", score: 4.4, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "TheVidyaVikas School", type: "School", city: "Mysuru", address: "Saraswathipuram, Mysuru", score: 4.1, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Accessible Restroom"] }),
  d({ name: "University of Mysore", type: "College", city: "Mysuru", address: "Manasagangotri, Mysuru", score: 4.2, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Accessible Restroom", "Accessible Parking"] }),
  d({ name: "Forum Centre City Mall", type: "Shopping Mall", city: "Mysuru", address: "Vani Vilas Mohalla, Mysuru", score: 4.1, features: ["Wheelchair Access", "Elevator", "Accessible Restroom", "Accessible Parking"] }),
  d({ name: "Mysuru Junction Railway Station", type: "Railway Station", city: "Mysuru", address: "New Bull Temple Road, Mysuru", score: 3.7, features: ["Elevator", "Tactile paths", "Audio Announcements", "Accessible Restroom"] }),
  d({ name: "Mysuru Airport", type: "Airport", city: "Mysuru", address: "Mandakalli, Mysuru", score: 4.0, features: ["Wheelchair Access", "Elevator", "Audio Assistance", "Accessible Restroom"] }),
  d({ name: "Mysore Palace", type: "Public Building", city: "Mysuru", address: "Old Fort, Mysuru", score: 4.3, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Staff Assistance"] }),
  d({ name: "Brindavan Gardens", type: "Park", city: "Mysuru", address: "Srirangapatna, Mysuru", score: 4.0, features: ["Wheelchair Access", "Paved paths", "Accessible Restroom"] }),

  // ═══════════════════════════════════════ KOLKATA ═══════════════════════════════════════
  d({ name: "Apollo Gleneagles Hospital", type: "Hospital", city: "Kolkata", address: "Circus Avenue, Kolkata", score: 4.5, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "La Martiniere for Boys", type: "School", city: "Kolkata", address: "Shakespeare Sarani, Kolkata", score: 4.3, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Accessible Restroom"] }),
  d({ name: "Presidency University", type: "College", city: "Kolkata", address: "College Street, Kolkata", score: 4.2, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Accessible Restroom"] }),
  d({ name: "South City Mall", type: "Shopping Mall", city: "Kolkata", address: "Jadavpur, Kolkata", score: 4.3, features: ["Wheelchair Access", "Elevator", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "Howrah Junction Railway Station", type: "Railway Station", city: "Kolkata", address: "Howrah, Kolkata", score: 3.6, features: ["Elevator", "Tactile paths", "Audio Announcements", "Accessible Restroom"] }),
  d({ name: "Netaji Subhas Chandra Bose International Airport", type: "Airport", city: "Kolkata", address: "Dum Dum, Kolkata", score: 4.4, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "Victoria Memorial", type: "Public Building", city: "Kolkata", address: "Queens Way, Kolkata", score: 4.1, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Staff Assistance"] }),
  d({ name: "Millennium Park", type: "Park", city: "Kolkata", address: "Strand Road, Kolkata", score: 4.0, features: ["Wheelchair Access", "Paved paths", "Accessible Restroom"] }),

  // ═══════════════════════════════════════ KOCHI ═══════════════════════════════════════
  d({ name: "Amrita Institute of Medical Sciences", type: "Hospital", city: "Kochi", address: "Edappally, Kochi", score: 4.6, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "Chinmaya Vidyalaya", type: "School", city: "Kochi", address: "Kadavanthra, Kochi", score: 4.2, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Accessible Restroom"] }),
  d({ name: "Cochin University of Science and Technology", type: "College", city: "Kochi", address: "Kalamassery, Kochi", score: 4.3, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking"] }),
  d({ name: "Lulu Mall", type: "Shopping Mall", city: "Kochi", address: "Edappally, Kochi", score: 4.5, features: ["Wheelchair Access", "Elevator", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "Ernakulam Junction Railway Station", type: "Railway Station", city: "Kochi", address: "Ernakulam, Kochi", score: 3.9, features: ["Elevator", "Tactile paths", "Audio Announcements", "Accessible Restroom"] }),
  d({ name: "Cochin International Airport", type: "Airport", city: "Kochi", address: "Nedumbassery, Kochi", score: 4.5, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "Kerala High Court", type: "Public Building", city: "Kochi", address: "Ernakulam, Kochi", score: 3.8, features: ["Wheelchair Access", "Elevator", "Staff Assistance"] }),
  d({ name: "Marine Drive Park", type: "Park", city: "Kochi", address: "Marine Drive, Kochi", score: 4.2, features: ["Wheelchair Access", "Paved paths", "Accessible Restroom"] }),

  // ═══════════════════════════════════════ AHMEDABAD ═══════════════════════════════════════
  d({ name: "Sterling Hospital", type: "Hospital", city: "Ahmedabad", address: "Gurukul Road, Ahmedabad", score: 4.4, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "Shreyas School", type: "School", city: "Ahmedabad", address: "Paldi, Ahmedabad", score: 4.1, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Accessible Restroom"] }),
  d({ name: "Gujarat University", type: "College", city: "Ahmedabad", address: "Navrangpura, Ahmedabad", score: 4.2, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Accessible Restroom", "Accessible Parking"] }),
  d({ name: "Ahmedabad One Mall", type: "Shopping Mall", city: "Ahmedabad", address: "Vastrapur, Ahmedabad", score: 4.3, features: ["Wheelchair Access", "Elevator", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "Ahmedabad Junction Railway Station", type: "Railway Station", city: "Ahmedabad", address: "Kalupur, Ahmedabad", score: 3.7, features: ["Elevator", "Tactile paths", "Audio Announcements", "Accessible Restroom"] }),
  d({ name: "Sardar Vallabhbhai Patel International Airport", type: "Airport", city: "Ahmedabad", address: "Hansol, Ahmedabad", score: 4.5, features: ["Wheelchair Access", "Elevator", "Braille Signage", "Audio Assistance", "Accessible Restroom", "Accessible Parking", "Staff Assistance"] }),
  d({ name: "Gujarat High Court", type: "Public Building", city: "Ahmedabad", address: "Sarkhej, Ahmedabad", score: 3.8, features: ["Wheelchair Access", "Elevator", "Staff Assistance"] }),
  d({ name: "Kankaria Lakefront", type: "Park", city: "Ahmedabad", address: "Maninagar, Ahmedabad", score: 4.3, features: ["Wheelchair Access", "Paved paths", "Accessible Restroom"] }),
];

export const allCities = [
  "Delhi", "Bengaluru", "Mumbai", "Chennai", "Hyderabad",
  "Pune", "Mysuru", "Kolkata", "Kochi", "Ahmedabad",
];

export const placeTypes = [
  "Hospital", "School", "College", "Shopping Mall", "Railway Station",
  "Airport", "Public Building", "Park",
];

export const accessibilityNeeds = [
  "Blind / Visual", "Hearing", "Wheelchair / Mobility", "Speech / Communication", "Cognitive",
];

export function searchPlaces(
  cityQuery: string,
  placeType: string,
  accessNeed: string,
): Place[] {
  return allPlaces.filter((p) => {
    if (cityQuery) {
      const q = cityQuery.toLowerCase().trim();
      if (!p.city.toLowerCase().includes(q) && !p.address.toLowerCase().includes(q)) return false;
    }
    if (placeType && placeType !== "All Types" && p.type !== placeType) return false;
    if (accessNeed && accessNeed !== "All Needs") {
      if (accessNeed === "Blind / Visual" && p.blindFeatures.length === 0) return false;
      if (accessNeed === "Hearing" && p.hearingFeatures.length === 0) return false;
      if (accessNeed === "Wheelchair / Mobility" && p.wheelchairFeatures.length === 0) return false;
      if (accessNeed === "Speech / Communication" && p.communicationFeatures.length === 0) return false;
      if (accessNeed === "Cognitive" && p.cognitiveFeatures.length === 0) return false;
    }
    return true;
  });
}
