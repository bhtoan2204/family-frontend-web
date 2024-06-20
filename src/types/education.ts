export type EducationProgress = {
  id_education_progress: number;
  id_user: string;
  title: string;
  progress_notes: string;
  school_info: string;
  created_at: string;
  updated_at: string;
  avatar: string;
  firstname: string;
  lastname: string;
};

export type EducationProgressDetail = {
  id_education_progress: number;
  education_progress_info: {
    id_education_progress: number;
    id_user: string;
    id_family: number;
    title: string;
    progress_notes: string;
    school_info: string;
    created_at: string;
    updated_at: string;
  };
  subjects_info: SubjectInfo[] | null;
};

export type SubjectInfo = {
  id_subject: number;
  subject_name: string;
  description: string;
  status: string;
};

export type SubjectDetail = {
  id_subject: number;
  id_education_progress: number;
  subject_name: string;
  description: string;
  component_scores: ComponentScore[];
  midterm_score: number | null;
  final_score: number | null;
  bonus_score: number | null;
  status: string;
};

export type ComponentScore = {
  component_name: string;
  score: number;
};

export type EducationUserInfo = {
  firstname: string;
  lastname: string;
  avatar: string;
  genre: string;
  birthdate: string;
};

export type EducationProgressDetailWithSubject = {
  id_education_progress: number;
  id_family: number;
  id_user: string;
  title: string;
  progress_notes: string;
  school_info: string;
  created_at: string;
  updated_at: string;
  subjects: SubjectDetail[];
  user: EducationUserInfo;
};
