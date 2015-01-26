package crud.servicos.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import crud.modelo.Usuario;
import crud.repositorio.UsuarioRepo;
import crud.servicos.UsuarioServico;

@Service
public class UsuarioServicoImpl implements UsuarioServico {

	@Autowired
	private UsuarioRepo usuarioRepository;

	@Override
	public void salvarUsuario(Usuario usuario) {
		usuarioRepository.save(usuario);
	}

	@Override
	public void deletarUsuario(Long id) {
		usuarioRepository.delete(id);
	}

	@Override
	public List<Usuario> listar() {
		return (List<Usuario>) usuarioRepository.findAll();
	}

	@Override
	public Usuario recuperar(Long id) {
		return usuarioRepository.findOne(id);
	}

}
