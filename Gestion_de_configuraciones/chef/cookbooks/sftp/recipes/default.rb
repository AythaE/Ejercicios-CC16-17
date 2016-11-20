
directory '/home/ubuntu/sftp'
file "/home/ubuntu/sftp/README.txt" do
  owner "ubuntu"
  group "ubuntu"
  mode 00544
  action :create
  content "Directorio para intercambio de archivos usando sftp"
end

