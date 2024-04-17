import axios from "axios";
let defaultResume: string | undefined = undefined;

export const getDefaultResume = async () => {
  return {
    defaultResume: defaultResume,
  };
};

export const saveDefaultResume = async (data: { defaultResume: string }) => {
  defaultResume = data.defaultResume;
  return { success: true, defaultResume: defaultResume };
};

export const getOptimizedResume = async (data: {
  currentResume: string;
  jobDescription: string;
  customInstructions: string;
}) => {
  console.log("Outgoing data:");
  console.log(data);
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_URL}/optimize-resume`,
      data: {
        currentResume: data.currentResume,
        jobDescription: data.jobDescription,
        customInstructions: data.customInstructions,
      },
    });
    console.log("Incoming data:");
    console.log(response.data);
    return response.data?.answer?.optimizedResume;
  } catch (error: any) {
    console.error(error);
    throw Error(error.message);
  }
};
