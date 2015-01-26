package crud.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import crud.modelo.Usuario;
import crud.servicos.UsuarioServico;

/**
 * Controlador usando a api do spring MVC
 * 
 * @author Torquato
 *
 */
@Controller
@RequestMapping("/usuario")
public class UsuarioControl {

	private static final String JSON = MediaType.APPLICATION_JSON_VALUE;

	@Autowired
	private UsuarioServico usuarioServico;

	@RequestMapping(method = RequestMethod.GET, produces = JSON)
	public ResponseEntity<List<Usuario>> listAll() {
		return new ResponseEntity<List<Usuario>>(usuarioServico.listar(),
				HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = JSON)
	public ResponseEntity<Usuario> find(@PathVariable("id") Long id) {
		return new ResponseEntity<Usuario>(usuarioServico.recuperar(id),
				HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST, consumes = JSON)
	@ResponseBody
	public void adicionar(@RequestBody Usuario usuario) {
		usuarioServico.salvarUsuario(usuario);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = JSON)
	@ResponseBody
	public void atualizar(@PathVariable("id") Long id, @RequestBody Usuario usuario) {
		usuarioServico.salvarUsuario(usuario);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deletar(@PathVariable("id") Long id) {
		usuarioServico.deletarUsuario(id);
	}

}
