export const mockApiCall = (successProbability = 0.5, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isSuccess = Math.random() < successProbability;
      if (isSuccess) {
        resolve({ success: true, data: "Mock data here" });
      } else {
        resolve({ success: false, error: "Mock error message" });
      }
    }, delay);
  });
};
