const usuarioService = require('../services/usuario.service');

module.exports = {
  async crear(req, res) {
    try {
      const usuario = await usuarioService.crearUsuario(req.body);
      res.status(201).json(usuario);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error creando usuario' });
    }
  },

  async obtenerTodos(req, res) {
    try {
      const usuarios = await usuarioService.obtenerUsuarios();
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo usuarios' });
    }
  },

  async obtenerPorId(req, res) {
    try {
      const usuario = await usuarioService.obtenerUsuarioPorId(req.params.id);
      if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json(usuario);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo usuario' });
    }
  },

  async actualizar(req, res) {
    try {
      await usuarioService.actualizarUsuario(req.params.id, req.body);
      res.json({ mensaje: 'Usuario actualizado' });
    } catch (err) {
      res.status(500).json({ error: 'Error actualizando usuario' });
    }
  },

  async eliminar(req, res) {
    try {
      await usuarioService.eliminarUsuario(req.params.id);
      res.json({ mensaje: 'Usuario eliminado' });
    } catch (err) {
      res.status(500).json({ error: 'Error eliminando usuario' });
    }
  },

  async login(req, res) {
    try {
      const { correo, password } = req.body;
      const data = await usuarioService.login(correo, password);

      if (!data) return res.status(401).json({ error: 'Credenciales inválidas' });

      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Error en login' });
    }
  },

  async ventasPorUsuario(req, res) {
    try {
      const ventas = await usuarioService.ventasPorUsuario(req.params.id);
      res.json(ventas);
    } catch (err) {
      res.status(500).json({ error: 'Error obteniendo ventas del usuario' });
    }
  }
};
