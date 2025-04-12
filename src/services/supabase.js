import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Upload file function
export const uploadFile = async (file) => {
  try {
    const code = Math.random().toString(36).substring(2, 8)
    const filePath = `files/${code}`
    
    const { data, error } = await supabase.storage
      .from('dropbox')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (error) throw error

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('dropbox')
      .getPublicUrl(filePath)

    // Save file metadata
    const { error: dbError } = await supabase
      .from('files')
      .insert({
        code,
        name: file.name,
        type: file.type,
        size: file.size,
        url: publicUrl,
        created_at: new Date().toISOString()
      })

    if (dbError) throw dbError
    
    return code
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// Get file by code
export const getFileByCode = async (code) => {
  try {
    const { data, error } = await supabase
      .from('files')
      .select('*')
      .eq('code', code)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}