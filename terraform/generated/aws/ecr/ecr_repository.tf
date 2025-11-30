resource "aws_ecr_repository" "tfer--jack-backend" {
  encryption_configuration {
    encryption_type = "AES256"
  }

  image_scanning_configuration {
    scan_on_push = "false"
  }

  image_tag_mutability = "IMMUTABLE"
  name                 = "jack-backend"
  region               = "eu-north-1"
}

resource "aws_ecr_repository" "tfer--jack-frontend" {
  encryption_configuration {
    encryption_type = "AES256"
  }

  image_scanning_configuration {
    scan_on_push = "false"
  }

  image_tag_mutability = "IMMUTABLE"
  name                 = "jack-frontend"
  region               = "eu-north-1"
}
