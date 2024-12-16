export const fetchMovies = async () => {
    const response = await fetch('https://api.indrajala.in/api/admin/Corrosil-Desktop');
    const data = await response.json();
    return data;
  };


  export const toptrending = async () => {
    const response = await fetch('https://api.indrajala.in/api/admin/toptrending');
    const data = await response.json();
    return data;
  };



  export const topfiveMovies = async () => {
    const response = await fetch('https://api.indrajala.in/api/admin/topfive');
    const data = await response.json();
    return data;
  };


  export const upcomming = async () => {
    const response = await fetch('https://api.indrajala.in/api/admin/upcomming');
    const data = await response.json();
    return data;
  };

  // Ads API

  export const fetchAds = async () => {
    const response = await fetch(
      'https://api.indrajala.in/api/admin/get-advertisements-for-carousel'
    );
    const data = await response.json();
    return data;
  }




