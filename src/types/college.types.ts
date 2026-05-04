export interface CollegeCourse {
  name:     string;
  duration: string;
  seats:    number;
  fees:     string;
}

export interface CollegeRanking {
  nirf:  number | null;
  qs:    number | null;
  india: number | null;
}

export interface Institute {
  id:                string;
  name:              string;
  shortName:         string;
  type:              "engineering-college" | "coding-bootcamp" | "coaching-institute" | "spoken-english";
  icon:              string;
  city:              string;
  state:             string;
  address:           string;
  established:       number;
  rating:            number;
  reviewCount:       number;
  fees:              string;
  avgPackage:        string;
  highestPackage:    string;
  website:           string;
  phone:             string;
  email:             string;
  color:             string;
  affiliation:       string;
  approvedBy:        string[];
  ranking:           CollegeRanking;
  courses:           CollegeCourse[];
  topRecruiters:     string[];
  facilities:        string[];
  highlights:        string[];
  admissionProcess:  string;
  description:       string;
  tags:              string[];
  nearbyMetro:       string;
  mapLink:           string;
}