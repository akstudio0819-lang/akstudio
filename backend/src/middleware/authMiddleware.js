import { supabaseServer, isSupabaseServerConfigured } from '../config/supabase.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    // Demo / Dev mode check
    if (!isSupabaseServerConfigured) {
      req.user = { email: 'dev@akstudio.com', role: 'admin' };
      return next();
    }
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  if (isSupabaseServerConfigured && supabaseServer) {
    try {
      const { data: { user }, error } = await supabaseServer.auth.getUser(token);
      if (error || !user) {
        return res.status(401).json({ message: 'Not authorized, invalid token' });
      }
      const role = user.email && (user.email.endsWith('@akstudio.com') || user.email === 'admin@akstudio.com') ? 'admin' : 'client';
      req.user = {
        id: user.id,
        email: user.email,
        role
      };
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token verification failed' });
    }
  } else {
    // Dev fallback
    req.user = { email: 'dev@akstudio.com', role: 'admin' };
    next();
  }
};
