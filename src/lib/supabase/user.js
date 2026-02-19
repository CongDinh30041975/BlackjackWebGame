import { supabase } from './supabase'

export async function getProfileById(userId) {
  return await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()
}

export async function uploadAvatar(userId, file) {
  try {
    // Validate file
    if (!file || !file.type.startsWith('image/')) {
      throw new Error('File phải là hình ảnh')
    }

    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 
      'image/webp', 'image/gif'
    ];
    
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      throw new Error(`Chỉ chấp nhận ảnh: JPEG, PNG, WebP, GIF`);
    }

    // Tải file lên storage/avatars
    const timestamp = Date.now();
    const safeFileName = timestamp;
    const filePath = `${userId}/${safeFileName}`;
    
    const { error: uploadError} = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { 
        upsert: true,
        contentType: file.type,
        cacheControl: '3600'
      })      
    
    if (uploadError) throw uploadError

    // Lấy public URL của ảnh
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)
    
    const avatarUrl = urlData.publicUrl

    // Cập nhật avatar_url trong profiles table
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: avatarUrl })
      .eq('id', userId)

    if (updateError) throw updateError

    return { success: true, avatarUrl }
  } catch (error) {
    console.error('Error uploading avatar:', error)
    return { success: false, error: error.message }
  }
}

export async function updateDisplayName(userId, displayName) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ display_name: displayName })
      .eq('id', userId)
      .select()
      .maybeSingle()

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error updating display name:', error)
    return { success: false, error: error.message || error }
  }
}

