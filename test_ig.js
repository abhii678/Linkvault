async function testIG() {
  const token = 'IGAAYIGXts1nxBZAGFvOFByMDh4YjQ2N1dXc1VmSzZA6VGdyZA0dMZAEtoa29TQXdYVWhGWTcwc2pyTWJFbGZAJeHViMDRoUm9nMnFYSHo4SzZAQRG1zSEFtTXA1NkJsNmhiMWNpTTNGOW1NMTBrMF8yQUl4U2Nn';
  console.log("Testing IG API directly...");
  
  try {
    const res = await fetch(`https://graph.instagram.com/v21.0/me/conversations?platform=instagram&fields=id,updated_time,messages.limit(25){id,message,from,created_time}&access_token=${token}`);
    const data = await res.json();
    console.log("Response:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

testIG();
