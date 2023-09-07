export async function getData() {
    const res = await fetch(process.env.BASE_URL+'/api')
     if (!res.ok) {
      throw new Error('Failed to fetch')
    }
    return res.json()
  }