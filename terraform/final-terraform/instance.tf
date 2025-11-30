resource "aws_instance" "tfer--i-0128f52fb018e7401_web-0020-server" {
  ami                         = "ami-0fa91bc90632c73c9"
  associate_public_ip_address = "true"
  availability_zone           = "eu-north-1a"

  capacity_reservation_specification {
    capacity_reservation_preference = "open"
  }

  cpu_options {
    core_count       = "1"
    threads_per_core = "2"
  }

  disable_api_stop        = "false"
  disable_api_termination = "false"
  ebs_optimized           = "true"

  enclave_options {
    enabled = "false"
  }

  get_password_data                    = "false"
  hibernation                          = "false"
  instance_initiated_shutdown_behavior = "stop"
  instance_type                        = "m7i-flex.large"
  ipv6_address_count                   = "0"
  key_name                             = "devops"

  maintenance_options {
    auto_recovery = "default"
  }

  metadata_options {
    http_endpoint               = "enabled"
    http_protocol_ipv6          = "disabled"
    http_put_response_hop_limit = "2"
    http_tokens                 = "required"
    instance_metadata_tags      = "disabled"
  }

  monitoring                 = "false"
  placement_partition_number = "0"


  private_dns_name_options {
    enable_resource_name_dns_a_record    = "true"
    enable_resource_name_dns_aaaa_record = "false"
    hostname_type                        = "ip-name"
  }

  private_ip = "172.31.31.240"

  root_block_device {
    delete_on_termination = "true"
    encrypted             = "false"
    iops                  = "3000"
    throughput            = "125"
    volume_size           = "40"
    volume_type           = "gp3"
  }

  security_groups   = ["launch-wizard-1"]
  source_dest_check = "true"
  subnet_id         = "subnet-0d628fc4b6978d9e5"

  tags = {
    Name = "web server"
  }

  tags_all = {
    Name = "web server"
  }

  tenancy                = "default"
  vpc_security_group_ids = ["aws_security_group_tfer--launch-wizard-1_sg-0ec6b014361a627af_id"]
}

resource "aws_instance" "tfer--i-01f70758d2a91cead_Studentmanagement-env" {
  ami                         = "ami-08f3d5feff69e1736"
  associate_public_ip_address = "true"
  availability_zone           = "eu-north-1b"

  capacity_reservation_specification {
    capacity_reservation_preference = "open"
  }

  cpu_options {
    core_count       = "1"
    threads_per_core = "2"
  }

  credit_specification {
    cpu_credits = "unlimited"
  }

  disable_api_stop        = "false"
  disable_api_termination = "false"
  ebs_optimized           = "false"

  enclave_options {
    enabled = "false"
  }

  get_password_data                    = "false"
  hibernation                          = "false"
  iam_instance_profile                 = "ec2forapp"
  instance_initiated_shutdown_behavior = "stop"
  instance_type                        = "t3.micro"
  ipv6_address_count                   = "0"

  launch_template {
    id      = "lt-0e940bf58b2529d94"
    version = "1"
  }

  maintenance_options {
    auto_recovery = "default"
  }

  metadata_options {
    http_endpoint               = "enabled"
    http_protocol_ipv6          = "disabled"
    http_put_response_hop_limit = "2"
    http_tokens                 = "required"
    instance_metadata_tags      = "disabled"
  }

  monitoring                 = "false"
  placement_partition_number = "0"


  private_dns_name_options {
    enable_resource_name_dns_a_record    = "false"
    enable_resource_name_dns_aaaa_record = "false"
    hostname_type                        = "ip-name"
  }

  private_ip = "172.31.35.29"

  root_block_device {
    delete_on_termination = "true"
    encrypted             = "false"
    iops                  = "3000"
    throughput            = "125"
    volume_size           = "8"
    volume_type           = "gp3"
  }

  security_groups   = ["awseb-e-wfmw3u2a7p-stack-AWSEBSecurityGroup-Cu20Sqxhm370"]
  source_dest_check = "true"
  subnet_id         = "subnet-014deebf772950683"

  tags = {
    Name                                = "Studentmanagement-env"
    "elasticbeanstalk:environment-id"   = "e-wfmw3u2a7p"
    "elasticbeanstalk:environment-name" = "Studentmanagement-env"
  }

  tags_all = {
    Name                                = "Studentmanagement-env"
    "elasticbeanstalk:environment-id"   = "e-wfmw3u2a7p"
    "elasticbeanstalk:environment-name" = "Studentmanagement-env"
  }

  tenancy                = "default"
  user_data_base64       = "Q29udGVudC1UeXBlOiBtdWx0aXBhcnQvbWl4ZWQ7IGJvdW5kYXJ5PSI9PT09PT09PT09PT09PT01MTg5MDY1Mzc3MjIyODk4NDA3PT0iCk1JTUUtVmVyc2lvbjogMS4wCgotLT09PT09PT09PT09PT09PTUxODkwNjUzNzcyMjI4OTg0MDc9PQpDb250ZW50LVR5cGU6IHRleHQvY2xvdWQtY29uZmlnOyBjaGFyc2V0PSJ1cy1hc2NpaSIKTUlNRS1WZXJzaW9uOiAxLjAKQ29udGVudC1UcmFuc2Zlci1FbmNvZGluZzogN2JpdApDb250ZW50LURpc3Bvc2l0aW9uOiBhdHRhY2htZW50OyBmaWxlbmFtZT0iY2xvdWQtY29uZmlnLnR4dCIKCiNjbG91ZC1jb25maWcKcmVwb191cGdyYWRlOiBub25lCnJlcG9fcmVsZWFzZXZlcjogMjAyMy45CmNsb3VkX2ZpbmFsX21vZHVsZXM6CiAtIFtzY3JpcHRzLXVzZXIsIGFsd2F5c10KCi0tPT09PT09PT09PT09PT09NTE4OTA2NTM3NzIyMjg5ODQwNz09CkNvbnRlbnQtVHlwZTogdGV4dC94LXNoZWxsc2NyaXB0OyBjaGFyc2V0PSJ1cy1hc2NpaSIKTUlNRS1WZXJzaW9uOiAxLjAKQ29udGVudC1UcmFuc2Zlci1FbmNvZGluZzogN2JpdApDb250ZW50LURpc3Bvc2l0aW9uOiBhdHRhY2htZW50OyBmaWxlbmFtZT0idXNlci1kYXRhLnR4dCIKCiMhL2Jpbi9iYXNoCmV4ZWMgPiA+KHRlZSAtYSAvdmFyL2xvZy9lYi1jZm4taW5pdC5sb2d8bG9nZ2VyIC10IFtlYi1jZm4taW5pdF0gLXMgMj4vZGV2L2NvbnNvbGUpIDI+JjEKZWNobyBbYGRhdGUgLXUgKyIlWS0lbS0lZFQlSDolTTolU1oiYF0gU3RhcnRlZCBFQiBVc2VyIERhdGEKc2V0IC14CgoKZnVuY3Rpb24gc2xlZXBfZGVsYXkgCnsKICBpZiAoKCAkU0xFRVBfVElNRSA8ICRTTEVFUF9USU1FX01BWCApKTsgdGhlbiAKICAgIGVjaG8gU2xlZXBpbmcgJFNMRUVQX1RJTUUKICAgIHNsZWVwICRTTEVFUF9USU1FICAKICAgIFNMRUVQX1RJTUU9JCgoJFNMRUVQX1RJTUUgKiAyKSkgCiAgZWxzZSAKICAgIGVjaG8gU2xlZXBpbmcgJFNMRUVQX1RJTUVfTUFYICAKICAgIHNsZWVwICRTTEVFUF9USU1FX01BWCAgCiAgZmkKfQoKIyBFeGVjdXRpbmcgYm9vdHN0cmFwIHNjcmlwdApTTEVFUF9USU1FPTIKU0xFRVBfVElNRV9NQVg9MzYwMAp3aGlsZSB0cnVlOyBkbyAKICBjdXJsIGh0dHBzOi8vZWxhc3RpY2JlYW5zdGFsay1wbGF0Zm9ybS1hc3NldHMtZXUtbm9ydGgtMS5zMy5ldS1ub3J0aC0xLmFtYXpvbmF3cy5jb20vc3RhbGtzL2ViX2NvcnJldHRvMTdfYW1hem9uX2xpbnV4XzIwMjNfMS4wLjEzMTUuMF8yMDI1MTEwMTE1MjQyOC9saWIvVXNlckRhdGFTY3JpcHQuc2ggPiAvdG1wL2ViYm9vdHN0cmFwLnNoIAogIFJFU1VMVD0kPwogIGlmIFtbICIkUkVTVUxUIiAtbmUgMCBdXTsgdGhlbiAKICAgIHNsZWVwX2RlbGF5IAogIGVsc2UKICAgIC9iaW4vYmFzaCAvdG1wL2ViYm9vdHN0cmFwLnNoICAgICAnaHR0cHM6Ly9jbG91ZGZvcm1hdGlvbi13YWl0Y29uZGl0aW9uLWV1LW5vcnRoLTEuczMuZXUtbm9ydGgtMS5hbWF6b25hd3MuY29tL2FybiUzQWF3cyUzQWNsb3VkZm9ybWF0aW9uJTNBZXUtbm9ydGgtMSUzQTE1NTkzMTE5MTIyOSUzQXN0YWNrL2F3c2ViLWUtd2ZtdzN1MmE3cC1zdGFjay82ZDYzY2Y3MC1iZjk3LTExZjAtYWYxMS0wNjEwYWJlM2VlNmQvNmQ2NWE0MzAtYmY5Ny0xMWYwLWFmMTEtMDYxMGFiZTNlZTZkL0FXU0VCSW5zdGFuY2VMYXVuY2hXYWl0SGFuZGxlP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LURhdGU9MjAyNTExMTJUMDcxNTU3WiZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmWC1BbXotRXhwaXJlcz04NjM5OSZYLUFtei1DcmVkZW50aWFsPUFLSUFZT0xDSTcyQjNUSEJQWFVMJTJGMjAyNTExMTIlMkZldS1ub3J0aC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotU2lnbmF0dXJlPWExNzUyZmZhZDkyOWNmZGUwMDgxZWNlZmQxOTgzMWI1NjJkZmM1MjI3MjgzMzRjM2I0NzFhNzI0MzJmZGEwZDMnICAgICdhcm46YXdzOmNsb3VkZm9ybWF0aW9uOmV1LW5vcnRoLTE6MTU1OTMxMTkxMjI5OnN0YWNrL2F3c2ViLWUtd2ZtdzN1MmE3cC1zdGFjay82ZDYzY2Y3MC1iZjk3LTExZjAtYWYxMS0wNjEwYWJlM2VlNmQnICAgICdmYjBkMzMzZS1iMTJjLTQyNDktODZkMS00ZDA0MjY3NDFiN2EnICAgICdodHRwczovL2VsYXN0aWNiZWFuc3RhbGstaGVhbHRoLmV1LW5vcnRoLTEuYW1hem9uYXdzLmNvbScgICAgJycgICAgJ2h0dHBzOi8vZWxhc3RpY2JlYW5zdGFsay1wbGF0Zm9ybS1hc3NldHMtZXUtbm9ydGgtMS5zMy5ldS1ub3J0aC0xLmFtYXpvbmF3cy5jb20vc3RhbGtzL2ViX2NvcnJldHRvMTdfYW1hem9uX2xpbnV4XzIwMjNfMS4wLjEzMTUuMF8yMDI1MTEwMTE1MjQyOCcgICAgJ2V1LW5vcnRoLTEnCiAgICBSRVNVTFQ9JD8KICAgIGlmIFtbICIkUkVTVUxUIiAtbmUgMCBdXTsgdGhlbiAKICAgICAgc2xlZXBfZGVsYXkgCiAgICBlbHNlIAogICAgICBleGl0IDAgIAogICAgZmkgCiAgZmkgCmRvbmUKCi0tPT09PT09PT09PT09PT09NTE4OTA2NTM3NzIyMjg5ODQwNz09LS0g"
  vpc_security_group_ids = ["aws_security_group_tfer--awseb-e-wfmw3u2a7p-stack-AWSEBSecurityGroup-Cu20Sqxhm370_sg-082ce46356109d2ad_id"]
}

resource "aws_instance" "tfer--i-08a7ab1d4d0956157_jenkins-workers" {
  ami                         = "ami-0fa91bc90632c73c9"
  associate_public_ip_address = "true"
  availability_zone           = "eu-north-1a"

  capacity_reservation_specification {
    capacity_reservation_preference = "open"
  }

  cpu_options {
    core_count       = "1"
    threads_per_core = "2"
  }

  credit_specification {
    cpu_credits = "unlimited"
  }

  disable_api_stop        = "false"
  disable_api_termination = "false"
  ebs_optimized           = "true"

  enclave_options {
    enabled = "false"
  }

  get_password_data                    = "false"
  hibernation                          = "false"
  instance_initiated_shutdown_behavior = "stop"
  instance_type                        = "t3.micro"
  ipv6_address_count                   = "0"
  key_name                             = "jenkins"

  maintenance_options {
    auto_recovery = "default"
  }

  metadata_options {
    http_endpoint               = "enabled"
    http_protocol_ipv6          = "disabled"
    http_put_response_hop_limit = "2"
    http_tokens                 = "required"
    instance_metadata_tags      = "disabled"
  }

  monitoring                 = "false"
  placement_partition_number = "0"


  private_dns_name_options {
    enable_resource_name_dns_a_record    = "true"
    enable_resource_name_dns_aaaa_record = "false"
    hostname_type                        = "ip-name"
  }

  private_ip = "172.31.22.227"

  root_block_device {
    delete_on_termination = "true"
    encrypted             = "false"
    iops                  = "3000"
    throughput            = "125"
    volume_size           = "15"
    volume_type           = "gp3"
  }

  security_groups   = ["launch-wizard-1"]
  source_dest_check = "true"
  subnet_id         = "subnet-0d628fc4b6978d9e5"

  tags = {
    Name = "jenkins-workers"
  }

  tags_all = {
    Name = "jenkins-workers"
  }

  tenancy                = "default"
  vpc_security_group_ids = ["aws_security_group_tfer--launch-wizard-1_sg-0ec6b014361a627af_id"]
}

resource "aws_instance" "tfer--i-097f394482d69ec64_jenkins-controller" {
  ami                         = "ami-0fa91bc90632c73c9"
  associate_public_ip_address = "true"
  availability_zone           = "eu-north-1a"

  capacity_reservation_specification {
    capacity_reservation_preference = "open"
  }

  cpu_options {
    core_count       = "1"
    threads_per_core = "2"
  }

  credit_specification {
    cpu_credits = "unlimited"
  }

  disable_api_stop        = "false"
  disable_api_termination = "false"
  ebs_optimized           = "true"

  enclave_options {
    enabled = "false"
  }

  get_password_data                    = "false"
  hibernation                          = "false"
  instance_initiated_shutdown_behavior = "stop"
  instance_type                        = "t3.micro"
  ipv6_address_count                   = "0"
  key_name                             = "jenkins"

  maintenance_options {
    auto_recovery = "default"
  }

  metadata_options {
    http_endpoint               = "enabled"
    http_protocol_ipv6          = "disabled"
    http_put_response_hop_limit = "2"
    http_tokens                 = "required"
    instance_metadata_tags      = "disabled"
  }

  monitoring                 = "false"
  placement_partition_number = "0"


  private_dns_name_options {
    enable_resource_name_dns_a_record    = "true"
    enable_resource_name_dns_aaaa_record = "false"
    hostname_type                        = "ip-name"
  }

  private_ip = "172.31.31.173"

  root_block_device {
    delete_on_termination = "true"
    encrypted             = "false"
    iops                  = "3000"
    throughput            = "125"
    volume_size           = "25"
    volume_type           = "gp3"
  }

  security_groups   = ["launch-wizard-1"]
  source_dest_check = "true"
  subnet_id         = "subnet-0d628fc4b6978d9e5"

  tags = {
    Name = "jenkins-controller"
  }

  tags_all = {
    Name = "jenkins-controller"
  }

  tenancy                = "default"
  vpc_security_group_ids = ["aws_security_group_tfer--launch-wizard-1_sg-0ec6b014361a627af_id"]
}

resource "aws_instance" "tfer--i-0a4083869b2fbc709_terraformer" {
  ami                         = "ami-0fa91bc90632c73c9"
  associate_public_ip_address = "true"
  availability_zone           = "eu-north-1a"

  capacity_reservation_specification {
    capacity_reservation_preference = "open"
  }

  cpu_options {
    core_count       = "1"
    threads_per_core = "2"
  }

  credit_specification {
    cpu_credits = "unlimited"
  }

  disable_api_stop        = "false"
  disable_api_termination = "false"
  ebs_optimized           = "true"

  enclave_options {
    enabled = "false"
  }

  get_password_data                    = "false"
  hibernation                          = "false"
  instance_initiated_shutdown_behavior = "stop"
  instance_type                        = "t3.small"
  ipv6_address_count                   = "0"
  key_name                             = "terrrfomer"

  maintenance_options {
    auto_recovery = "default"
  }

  metadata_options {
    http_endpoint               = "enabled"
    http_protocol_ipv6          = "disabled"
    http_put_response_hop_limit = "2"
    http_tokens                 = "required"
    instance_metadata_tags      = "disabled"
  }

  monitoring                 = "false"
  placement_partition_number = "0"


  private_dns_name_options {
    enable_resource_name_dns_a_record    = "true"
    enable_resource_name_dns_aaaa_record = "false"
    hostname_type                        = "ip-name"
  }

  private_ip = "172.31.26.104"

  root_block_device {
    delete_on_termination = "true"
    encrypted             = "false"
    iops                  = "3000"
    throughput            = "125"
    volume_size           = "25"
    volume_type           = "gp3"
  }

  security_groups   = ["launch-wizard-2"]
  source_dest_check = "true"
  subnet_id         = "subnet-0d628fc4b6978d9e5"

  tags = {
    Name = "terraformer"
  }

  tags_all = {
    Name = "terraformer"
  }

  tenancy                = "default"
  vpc_security_group_ids = ["aws_security_group_tfer--launch-wizard-2_sg-0e766dcaeebd53d09_id"]
}
