resource "aws_security_group" "tfer--awseb-e-wfmw3u2a7p-stack-AWSEBSecurityGroup-Cu20Sqxhm370_sg-082ce46356109d2ad" {
  description = "SecurityGroup for ElasticBeanstalk environment."

  egress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = "0"
    protocol    = "-1"
    self        = "false"
    to_port     = "0"
  }

  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = "80"
    protocol    = "tcp"
    self        = "false"
    to_port     = "80"
  }

  name   = "awseb-e-wfmw3u2a7p-stack-AWSEBSecurityGroup-Cu20Sqxhm370"

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

  vpc_id = "vpc-0c31ec75d9cca6989"
}

resource "aws_security_group" "tfer--default_sg-0da3602ac5c81d27f" {
  description = "default VPC security group"

  egress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = "0"
    protocol    = "-1"
    self        = "false"
    to_port     = "0"
  }

  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = "5432"
    protocol    = "tcp"
    self        = "false"
    to_port     = "5432"
  }

  ingress {
    from_port = "0"
    protocol  = "-1"
    self      = "true"
    to_port   = "0"
  }

  name   = "default"
  vpc_id = "vpc-0c31ec75d9cca6989"
}

resource "aws_security_group" "tfer--jenkins-sec-group_sg-09d573334cd1814f7" {
  description = "sec group for jenkins"

  egress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = "0"
    protocol    = "-1"
    self        = "false"
    to_port     = "0"
  }

  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = "8080"
    protocol    = "tcp"
    self        = "false"
    to_port     = "8080"
  }

  name   = "jenkins-sec-group"
  vpc_id = "vpc-0c31ec75d9cca6989"
}

resource "aws_security_group" "tfer--launch-wizard-1_sg-0ec6b014361a627af" {
  description = "launch-wizard-1 created 2025-11-15T07:23:31.929Z"

  egress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = "0"
    protocol    = "-1"
    self        = "false"
    to_port     = "0"
  }

  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = "0"
    protocol    = "-1"
    self        = "false"
    to_port     = "0"
  }

  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = "443"
    protocol    = "tcp"
    self        = "false"
    to_port     = "443"
  }

  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = "80"
    protocol    = "tcp"
    self        = "false"
    to_port     = "80"
  }

  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = "8080"
    protocol    = "tcp"
    self        = "false"
    to_port     = "8080"
  }

  ingress {
    cidr_blocks = ["197.37.170.29/32"]
    from_port   = "22"
    protocol    = "tcp"
    self        = "false"
    to_port     = "22"
  }

  name   = "launch-wizard-1"
  vpc_id = "vpc-0c31ec75d9cca6989"
}

resource "aws_security_group" "tfer--launch-wizard-2_sg-0e766dcaeebd53d09" {
  description = "launch-wizard-2 created 2025-11-30T16:11:06.279Z"

  egress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = "0"
    protocol    = "-1"
    self        = "false"
    to_port     = "0"
  }

  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = "22"
    protocol    = "tcp"
    self        = "false"
    to_port     = "22"
  }

  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = "443"
    protocol    = "tcp"
    self        = "false"
    to_port     = "443"
  }

  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = "80"
    protocol    = "tcp"
    self        = "false"
    to_port     = "80"
  }

  name   = "launch-wizard-2"
  vpc_id = "vpc-0c31ec75d9cca6989"
}
