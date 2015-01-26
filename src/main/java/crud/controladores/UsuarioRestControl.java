package crud.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import crud.modelo.Usuario;
import crud.servicos.UsuarioServico;

/**
 * Controlador usando apenas o Restful
 * 
 * @author Torquato
 *
 */
@RestController
@RequestMapping(value = "/rest")
public class UsuarioRestControl {

	private static final String JSON = MediaType.APPLICATION_JSON_VALUE;

	@Autowired
	private UsuarioServico usuarioServico;

	@RequestMapping(method = RequestMethod.GET)
	public List<Usuario> listAll() {
		return usuarioServico.listar();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Usuario recuperar(@PathVariable("id") Long id) {
		return usuarioServico.recuperar(id);
	}

}
