<?php get_header(); 
	/***
	* Load cryptocurrency-exchange Theme Option Setting
	*/
	$cryptocurrency_exchange_slider_section = get_theme_mod('cryptocurrency_exchange_slider_section', 'inactive');
	$cryptocurrency_exchange_service_section = get_theme_mod('cryptocurrency_exchange_service_section', 'inactive');
	$cryptocurrency_exchange_testimonial_section = get_theme_mod('cryptocurrency_exchange_testimonial_section', 'inactive');
	$cryptocurrency_exchange_blog_section = get_theme_mod('cryptocurrency_exchange_blog_section', 'inactive');
	$cryptocurrency_exchange_portfolio_section = get_theme_mod('cryptocurrency_exchange_portfolio_section', 'inactive');
	
	if ( $cryptocurrency_exchange_slider_section == "active" ) { get_template_part('index-slider'); }
	if ( $cryptocurrency_exchange_service_section == "active" ) { get_template_part('index-service'); }
	if ( $cryptocurrency_exchange_portfolio_section == "active" ) { get_template_part('index-portfolio'); }
	if ( $cryptocurrency_exchange_testimonial_section == "active" ) { get_template_part('index-testimonial'); }
	if ( $cryptocurrency_exchange_blog_section == "active" ) { get_template_part('index-blog'); }
	
	
	//static page setting
	$cryptocurrency_exchange_static_page_setting = get_theme_mod('cryptocurrency_exchange_static_page_setting', 'active');

	//for breadcrumb
	if ( $cryptocurrency_exchange_service_section == "inactive" && $cryptocurrency_exchange_slider_section == "inactive" 
		&& $cryptocurrency_exchange_testimonial_section == "inactive" && $cryptocurrency_exchange_blog_section == "inactive"
		&& $cryptocurrency_exchange_portfolio_section == "inactive"  ){
		get_template_part('breadcrumb'); ?>
<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
<!--front-page.php-->
<section class="module-small">
    <div class="container" id="content">
		<div class="row">
			<?php if ( is_active_sidebar( 'sidebar-widget' ) ) { ?>
			<div class="col-md-8 col-sm-6 col-xs-12">
				<?php } else { ?>
			<div class="col-md-12 col-sm-6 col-xs-12">
				<?php } ?>
				<div class="post-columns site-info">
					<?php
					if(have_posts()) :
						while (have_posts()) : the_post();
						//$post_id = get_the_ID();
						
						//feature img url
						$cryptocurrency_exchange_url = wp_get_attachment_url( get_post_thumbnail_id($post->ID), 'thumbnail' );  ?>		
						<div class="post">					
							<div class="post-thumbnail">
								<a href="<?php the_permalink(); ?>"><?php if($cryptocurrency_exchange_url != NULL) { the_post_thumbnail(); } ?></a>	
							</div>	
							<div class="post-meta-area">
								<?php if (has_category()) : ?>	
									<span class="cat-links">
										<?php the_category('&nbsp;,&nbsp');?>
									</span>
								<?php endif; ?>
							</div>
							<div class="post-content-area">
								<div class="post-header font-alt">
									<h2 class="post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
									<div class="post-meta">
										<span><i class="fa fa-user"></i> <?php esc_html_e('By','cryptocurrency-exchange'); ?> <a href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>"><?php the_author(); ?></a></span>
										<span><i class="fa fa-calendar"></i>  <a href="<?php the_permalink(); ?>"><?php echo get_the_date(); ?></a></span>
									</div>
								</div>
								<div class="post-more">
									<div class="post-entry">
										<?php
										// added excerpt for front-page if setting is active
										$cryptocurrency_exchange_readmore_general = get_theme_mod('cryptocurrency_exchange_readmore_general', 'inactive');
										if($cryptocurrency_exchange_readmore_general == 'active' && 'posts' == get_option( 'show_on_front' )){ ?>
											<?php the_excerpt(); ?>
											<p class="post-button">
												<a class="more-link" href="<?php the_permalink()?>"><?php esc_html_e('Read More','cryptocurrency-exchange'); ?></a>
											</p>
										<?php  } else { 
											the_content(__('Read More','cryptocurrency-exchange')); 
										} ?>
									</div>
								</div>
							</div>
						</div>
					<?php
						endwhile;
						// Reset Post Data
						wp_reset_postdata();
						endif;
					?>	
					<div style="text-align: center;" class="col-lg-12 col-md-12 col-sm-12 pagination font-alt">
						<?php									
							// Custom query loop pagination			
							global $wp_query;
							$cryptocurrency_exchange_big = 999999999; // need an unlikely integer
							
							the_posts_pagination( array(
								'base'      => str_replace( $cryptocurrency_exchange_big, '%#%', get_pagenum_link( $cryptocurrency_exchange_big ) ),
								'format'    => '?paged=%#%',
								'current'   => max( 1, get_query_var('paged') ),
								'total'     => $wp_query->max_num_pages,
								'prev_text' => __('&#x276E;', 'cryptocurrency-exchange'),
								'next_text' => __('&#x276F;', 'cryptocurrency-exchange'),
							) );
						?>
					</div>
				</div>
			</div>
			<?php if ( is_active_sidebar( 'sidebar-widget' ) ) { ?>
			<div class="col-md-4 col-sm-6 col-xs-12">
				<div class="sidebar"><!--Sidebar Widget-->
					<?php dynamic_sidebar('sidebar-widget') ?>
				</div><!--Sidebar Widget End-->
			</div>
			<?php } ?>
		</div><!--/.row-->
	</div> <!--/.container-->
</section>
<?php } ?>
<?php get_footer(); ?>