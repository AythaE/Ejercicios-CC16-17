# Ejercicio 2
> Instalar una máquina virtual ArchLinux o FreeBSD para KVM, otro hipervisor libre, usando Vagrant y conectar con ella.

Lo primero que hay que hacer es instalar un plugin de Vagrant llamado [libvirt](https://github.com/vagrant-libvirt/vagrant-libvirt) dicho plugin es la libreria [libvirt](https://libvirt.org/) que sirve para extraer diversos hipervisores actuando como una API de estos. Para instalar el mencionado plugin hay que seguir estas [instrucciones de instalacion](https://github.com/vagrant-libvirt/vagrant-libvirt#installation).

Una vez hecho eso utilizando el [listado oficial de VM de Vagrant](http://www.vagrantbox.es/) o el [listado de Atlas](https://atlas.hashicorp.com/boxes/search) (también de Hashicorp) hay que seleccionar una imagen de una maquina virtual cuyo proveedor sea libvirt, en mi caso he decidido seleccionar una imagen de ArchLinux.

```
vagrant init bugyt/archlinux
vagrant up --provider libvirt
```

Esto debería descargar la imagen pero en su lugar me ha dado diversos problemas desde [problemas para crear el dominio para el volumen](https://github.com/vagrant-libvirt/vagrant-libvirt/issues/561) al problema que se puede observar en el siguiente [`log`](vagrant/archlinux/vagrantUp.log)

```
...
ERROR warden: Error occurred: Initialization parameters must be an attributes hash, got NilClass nil
 INFO warden: Beginning recovery process...
 INFO warden: Calling recover: #<Vagrant::Action::Builtin::Call:0x0000000386e4f0>
 INFO warden: Beginning recovery process...
 INFO warden: Recovery complete.
 INFO warden: Recovery complete.
 INFO warden: Beginning recovery process...
 INFO warden: Recovery complete.
 INFO environment: Released process lock: machine-action-8a5e82d48011188c29fc977e697597a8
 INFO environment: Running hook: environment_unload
 INFO runner: Preparing hooks for middleware sequence...
 INFO runner: 2 hooks defined.
 INFO runner: Running action: environment_unload #<Vagrant::Action::Builder:0x00000003a15ec0>
/home/aythae/.vagrant.d/gems/gems/fog-core-1.43.0/lib/fog/core/collection.rb:87:in `new': Initialization parameters must be an attributes hash, got NilClass nil (ArgumentError)
	from /home/aythae/.vagrant.d/gems/gems/fog-core-1.43.0/lib/fog/core/collection.rb:77:in `block in load'
	from /home/aythae/.vagrant.d/gems/gems/fog-core-1.43.0/lib/fog/core/collection.rb:77:in `each'
	from /home/aythae/.vagrant.d/gems/gems/fog-core-1.43.0/lib/fog/core/collection.rb:77:in `load'
	from /home/aythae/.vagrant.d/gems/gems/fog-libvirt-0.3.0/lib/fog/libvirt/models/compute/volumes.rb:11:in `all'
	from /home/aythae/.vagrant.d/gems/gems/fog-libvirt-0.3.0/lib/fog/libvirt/models/compute/server.rb:137:in `block in volumes'
	from /home/aythae/.vagrant.d/gems/gems/fog-libvirt-0.3.0/lib/fog/libvirt/models/compute/server.rb:137:in `map'
	from /home/aythae/.vagrant.d/gems/gems/fog-libvirt-0.3.0/lib/fog/libvirt/models/compute/server.rb:137:in `volumes'
	from /home/aythae/.vagrant.d/gems/gems/fog-core-1.43.0/lib/fog/formatador.rb:78:in `block in object_attributes'
	from /home/aythae/.vagrant.d/gems/gems/fog-core-1.43.0/lib/fog/formatador.rb:77:in `map'
	from /home/aythae/.vagrant.d/gems/gems/fog-core-1.43.0/lib/fog/formatador.rb:77:in `object_attributes'
	from /home/aythae/.vagrant.d/gems/gems/fog-core-1.43.0/lib/fog/formatador.rb:63:in `attribute_string'
	from /home/aythae/.vagrant.d/gems/gems/fog-core-1.43.0/lib/fog/formatador.rb:53:in `object_string'
	from /home/aythae/.vagrant.d/gems/gems/fog-core-1.43.0/lib/fog/formatador.rb:14:in `block in format'
	from /home/aythae/.vagrant.d/gems/gems/formatador-0.2.5/lib/formatador.rb:92:in `indent'
	from /home/aythae/.vagrant.d/gems/gems/fog-core-1.43.0/lib/fog/formatador.rb:41:in `indent'
	from /home/aythae/.vagrant.d/gems/gems/fog-core-1.43.0/lib/fog/formatador.rb:14:in `format'
	from /home/aythae/.vagrant.d/gems/gems/fog-core-1.43.0/lib/fog/core/model.rb:24:in `inspect'
	from /home/aythae/.vagrant.d/gems/gems/fog-core-1.43.0/lib/fog/core/collection.rb:19:in `inspect'
	from /home/aythae/.vagrant.d/gems/gems/fog-core-1.43.0/lib/fog/core/collection.rb:19:in `to_s'
	from /home/aythae/.vagrant.d/gems/gems/vagrant-libvirt-0.0.36/lib/vagrant-libvirt/action/set_name_of_domain.rb:18:in `call'
	from /opt/vagrant/embedded/gems/gems/vagrant-1.8.7/lib/vagrant/action/warden.rb:34:in `call'
	from /opt/vagrant/embedded/gems/gems/vagrant-1.8.7/lib/vagrant/action/warden.rb:95:in `block in finalize_action'
	from /opt/vagrant/embedded/gems/gems/vagrant-1.8.7/lib/vagrant/action/warden.rb:34:in `call'
	from /opt/vagrant/embedded/gems/gems/vagrant-1.8.7/lib/vagrant/action/warden.rb:34:in `call'
	from /opt/vagrant/embedded/gems/gems/vagrant-1.8.7/lib/vagrant/action/builder.rb:116:in `call'
	from /opt/vagrant/embedded/gems/gems/vagrant-1.8.7/lib/vagrant/action/runner.rb:66:in `block in run'
	from /opt/vagrant/embedded/gems/gems/vagrant-1.8.7/lib/vagrant/util/busy.rb:19:in `busy'
	from /opt/vagrant/embedded/gems/gems/vagrant-1.8.7/lib/vagrant/action/runner.rb:66:in `run'
	from /opt/vagrant/embedded/gems/gems/vagrant-1.8.7/lib/vagrant/action/builtin/call.rb:53:in `call'
	from /opt/vagrant/embedded/gems/gems/vagrant-1.8.7/lib/vagrant/action/warden.rb:34:in `call'
	from /opt/vagrant/embedded/gems/gems/vagrant-1.8.7/lib/vagrant/action/builtin/config_validate.rb:25:in `call'
	from /opt/vagrant/embedded/gems/gems/vagrant-1.8.7/lib/vagrant/action/warden.rb:34:in `call'
	from /opt/vagrant/embedded/gems/gems/vagrant-1.8.7/lib/vagrant/action/builder.rb:116:in `call'
	from /opt/vagrant/embedded/gems/gems/vagrant-1.8.7/lib/vagrant/action/runner.rb:66:in `block in run'
	from /opt/vagrant/embedded/gems/gems/vagrant-1.8.7/lib/vagrant/util/busy.rb:19:in `busy'
	from /opt/vagrant/embedded/gems/gems/vagrant-1.8.7/lib/vagrant/action/runner.rb:66:in `run'
	from /opt/vagrant/embedded/gems/gems/vagrant-1.8.7/lib/vagrant/machine.rb:225:in `action_raw'
	from /opt/vagrant/embedded/gems/gems/vagrant-1.8.7/lib/vagrant/machine.rb:200:in `block in action'
	from /opt/vagrant/embedded/gems/gems/vagrant-1.8.7/lib/vagrant/environment.rb:567:in `lock'
	from /opt/vagrant/embedded/gems/gems/vagrant-1.8.7/lib/vagrant/machine.rb:186:in `call'
	from /opt/vagrant/embedded/gems/gems/vagrant-1.8.7/lib/vagrant/machine.rb:186:in `action'
	from /opt/vagrant/embedded/gems/gems/vagrant-1.8.7/lib/vagrant/batch_action.rb:82:in `block (2 levels) in run'
```

Por lo que he sido incapaz de usar una maquina en un visor como KVM usando el plugin `vagrant-libvirt`.
