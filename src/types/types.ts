//login types
export type loginType = {
  email: string;
  password: string;
  fullname: string;
};

export type AxiosErrorResponse = {
  message: string;
  name: string;
  stack: string;
  code: string;
  status: number;
  response: AxiosResponse;
};

type AxiosResponse = {
  data: string[];
};

//register types

export type RegistrationType = {
  fullname: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type errorMsgType = {
  email: string;
  password: string;
};

// home page types

export type tagsType = {
  [x: string]: any;
  id: number;
  name: string;
};

export type Tags = {
  id: number;
  name: string;
  slug: string;
};

export type authorType = {
  id: number;
  fullname: string;
  email: string;
  rating: number;
};

export type questionType = {
  id: number;
  title: string;
  tag_names: string[];
  description: string;
  answers_count: number;
  created_at: string;
  author: authorType;
};
